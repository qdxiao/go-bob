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
                                content: `请将以下中文文本转换为符合 Go 语言命名规范的变量名，要求：
1. 使用驼峰命名法
2. 首字母小写
3. 使用一个英文单词，不要使用多个单词组合
4. 保持简洁
5. 遵循 Uber Go 语言编码规范：
   - 变量名应该简短且具有描述性
   - 避免使用缩写，除非是广泛使用的缩写（如 URL、HTTP）
   - 对于布尔变量，使用 is、has、should 等前缀
   - 对于切片变量，使用复数形式
   - 对于接口类型，使用 -er 后缀
   - 对于错误类型，使用 Error 后缀
   - 对于包级别变量，使用更详细的命名
   - 对于局部变量，使用更简短的命名
   - 对于常量，使用驼峰命名法
   - 对于枚举值，使用驼峰命名法
   - 对于类型参数，使用单个大写字母（如 T、K、V）
   - 对于接收器名称，使用一到两个字母的缩写
   - 对于测试函数，使用 Test 前缀
   - 对于基准测试函数，使用 Benchmark 前缀
   - 对于示例函数，使用 Example 前缀
   - 对于结构体命名：
     * 使用驼峰命名法
     * 首字母大写
     * 避免使用缩写
     * 使用名词或名词短语
     * 避免使用类型名称作为后缀（如 UserStruct）
   - 对于接口命名：
     * 使用驼峰命名法
     * 首字母大写
     * 使用名词或名词短语
     * 使用 -er 后缀（如 Reader、Writer）
     * 避免使用 I 前缀（如 IReader）
     * 接口名称应该反映其行为而不是实现
6. 遵循 Go 包命名规范：
   - 包名应该是简短、清晰的小写名词
   - 避免使用下划线或混合大小写
   - 避免使用无意义的包名（如 util、common、misc）
   - 避免使用单个包来包含所有 API
   - 避免与标准库包名冲突
   - 包名应该反映其功能，而不是其实现
   - 包名应该避免与用户代码中的常见变量名冲突

输入文本：${text}

请只返回一个英文单词作为变量名，不要返回任何解释、标点符号或多个单词。`
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
            let variableName;
            if (qwenResponse.data.output.choices && qwenResponse.data.output.choices[0]) {
                variableName = qwenResponse.data.output.choices[0].message.content;
                $log.info('从 choices[0].message.content 获取结果：' + variableName);
            } else if (qwenResponse.data.output.text) {
                variableName = qwenResponse.data.output.text;
                $log.info('从 output.text 获取结果：' + variableName);
            } else {
                $log.info('完整的 output 内容：' + JSON.stringify(qwenResponse.data.output, null, 2));
                throw new Error('无法从响应中获取有效的文本内容');
            }

            // 确保 variableName 是字符串
            if (typeof variableName !== 'string') {
                $log.info('变量名不是字符串类型，原始类型：' + typeof variableName);
                $log.info('原始值：' + JSON.stringify(variableName));
                variableName = String(variableName);
            }

            // 清理变量名
            variableName = variableName
                .replace(/['"]/g, '') // 移除引号
                .replace(/[^a-zA-Z0-9]/g, '') // 只保留字母和数字
                .trim();
            
            // 如果包含空格，只取第一个单词
            if (variableName.includes(' ')) {
                variableName = variableName.split(' ')[0];
            }
            
            // 确保首字母小写
            if (variableName) {
                variableName = variableName.charAt(0).toLowerCase() + variableName.slice(1);
            } else {
                variableName = 'variable'; // 默认值
            }
            
            $log.info(`最终生成的变量名: ${variableName}`);
            
            // 返回结果
            completion({
                result: {
                    from: detectFrom,
                    to: detectTo,
                    fromParagraphs: [text],
                    toParagraphs: [variableName],
                    toDict: {
                        goVariableName: variableName
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
