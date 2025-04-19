/**
 * 由于各大服务商的语言代码都不大一样，
 * 所以我定义了一份 Bob 专用的语言代码，以便 Bob 主程序和插件之间互传语种。
 * Bob 语言代码列表 https://ripperhe.gitee.io/bob/#/plugin/addtion/language
 * 
 * 转换的代码建议以下面的方式实现，
 * `xxx` 代表服务商特有的语言代码，请替换为真实的，
 * 具体支持的语种数量请根据实际情况而定。
 * 
 * Bob 语言代码转服务商语言代码(以为 'zh-Hans' 为例): var lang = langMap.get('zh-Hans');
 * 服务商语言代码转 Bob 语言代码: var standardLang = langMapReverse.get('xxx');
 */

/**
 * 支持的语言代码映射
 */
var items = [
    ['auto', 'auto'],
    ['zh-Hans', 'zh'],
    ['en', 'en'],
];

var langMap = new Map(items);
var langMapReverse = new Map(items.map(([standardLang, lang]) => [lang, standardLang]));

/**
 * 返回支持的语言列表
 */
function supportLanguages() {
    return items.map(([standardLang, lang]) => standardLang);
}

/**
 * 翻译函数
 */
function translate(query, completion) {
    (async () => {
        try {
            const { text, detectFrom, detectTo } = query;
            
            // 添加日志
            $log.info(`开始处理文本: ${text}`);
            
            const qwenResponse = await $http.post({
                url: "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
                header: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${$option.apiKey}`
                },
                body: {
                    model: "qwen-max",
                    input: {
                        messages: [
                            {
                                role: "user",
                                content: `请为以下 Go 函数生成符合 Go 文档规范的文档注释。要求：

1. 文档格式：
   - 使用 // 注释
   - 第一行是函数的功能描述
   - 如果有 HTTP 接口，需要说明 URL
   - 如果有权限要求，需要说明
   - 如果有示例，需要包含请求和响应示例
   - 如果有错误响应，需要包含错误示例

2. 文档内容：
   - 函数功能描述要简洁明了
   - 参数说明要完整
   - 返回值说明要完整
   - 错误处理要说明
   - 示例要完整且可运行

3. 示例格式：
   - 使用 Example: 标记示例
   - 请求示例使用 request: 标记
   - 响应示例使用 response: 标记
   - 错误示例使用 error response: 标记
   - 示例使用 JSON 格式
   - 示例要包含所有必要的字段

输入文本：${text}

请只返回文档注释，不要返回其他内容。`
                            }
                        ]
                    }
                }
            });

            // 详细记录响应数据结构
            $log.info('通义千问完整响应：' + JSON.stringify(qwenResponse, null, 2));
            $log.info('响应数据类型：' + typeof qwenResponse);
            
            if (qwenResponse.error) {
                throw new Error(`API错误：${qwenResponse.error}`);
            }

            if (!qwenResponse.data) {
                throw new Error('API响应缺少data字段');
            }

            if (!qwenResponse.data.output) {
                throw new Error('API响应缺少output字段');
            }

            // 尝试从不同位置获取结果
            let doc;
            if (qwenResponse.data.output.choices && qwenResponse.data.output.choices[0]) {
                doc = qwenResponse.data.output.choices[0].message.content;
                $log.info('从 choices[0].message.content 获取结果：' + doc);
            } else if (qwenResponse.data.output.text) {
                doc = qwenResponse.data.output.text;
                $log.info('从 output.text 获取结果：' + doc);
            } else {
                $log.info('完整的 output 内容：' + JSON.stringify(qwenResponse.data.output, null, 2));
                throw new Error('无法从响应中获取有效的文本内容');
            }

            // 确保 doc 是字符串
            if (typeof doc !== 'string') {
                $log.info('文档不是字符串类型，原始类型：' + typeof doc);
                $log.info('原始值：' + JSON.stringify(doc));
                doc = String(doc);
            }

            // 清理文档
            doc = doc
                .replace(/```go/g, '') // 移除代码块标记
                .replace(/```/g, '') // 移除代码块标记
                .trim();
            
            $log.info(`最终生成的文档: ${doc}`);
            
            // 返回结果
            completion({
                result: {
                    from: detectFrom,
                    to: detectTo,
                    fromParagraphs: [text],
                    toParagraphs: [doc],
                    toDict: {
                        goDoc: doc
                    }
                }
            });
        } catch (error) {
            // 添加详细的错误日志
            $log.error(`处理错误: ${error.message}`);
            $log.error(`错误堆栈: ${error.stack}`);
            
            completion({
                error: {
                    type: 'api',
                    message: `处理失败：${error.message}`
                }
            });
        }
    })();
}

/**
 * 验证函数
 */
function pluginValidate(completion) {
    (async () => {
        try {
            // 检查必要的配置
            if (!$option.apiKey) {
                completion({
                    result: false,
                    error: {
                        type: 'secretKey',
                        message: '请先配置通义千问 API Key',
                        troubleshootingLink: 'https://help.aliyun.com/document_detail/611472.html'
                    }
                });
                return;
            }

            // 测试通义千问 API
            const response = await $http.post({
                url: "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
                header: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${$option.apiKey}`
                },
                body: {
                    model: "qwen-vl-max",
                    input: {
                        messages: [
                            {
                                role: "user",
                                content: "测试"
                            }
                        ]
                    },
                    parameters: {
                        result_format: "text"
                    }
                }
            });

            // 添加日志
            $log.info(`验证 API 响应: ${JSON.stringify(response)}`);

            if (response.error) {
                throw new Error(`API 调用失败: ${response.error}`);
            }

            if (!response.data || !response.data.output) {
                throw new Error('API 返回数据格式不正确');
            }

            completion({ result: true });
        } catch (error) {
            $log.error(`验证错误: ${error.message}`);
            $log.error(`错误详情: ${JSON.stringify(error)}`);
            
            completion({
                result: false,
                error: {
                    type: 'api',
                    message: `验证失败: ${error.message}`,
                    addtion: error.stack
                }
            });
        }
    })();
}
