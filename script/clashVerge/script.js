// Define the `main` function

const proxyName = "♻ 统一代理";

function main(params) {
    if (!params.proxies) return params;
    overwriteRules(params);
    overwriteProxyGroups(params);
    overwriteDns(params);
    return params;
}


//覆写代理组
function overwriteProxyGroups(params) {
    // 所有代理
    const allProxies = params["proxies"].map((e) => e.name);
    // 自动选择代理组，按地区分组选延迟最低
    const areaProxyGroupRegexs = [
        {
            name: "🛩️ 高速套餐",
            regex: /香港|HK|Hong Kong|🇭🇰|HongKong|日本|川日|东京|大阪|泉日|埼玉|沪日|深日|JP|Japan|台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼|韩国|首尔|Kr|Korea|新加坡|坡|狮城|SG|Singapore|🇸🇬/
        },
        {name: "🕊️任性套餐", regex: /^(?!.*(套餐|剩余|故障|自动)).*(0.5|0.5倍|0.5x|0.1|0.1倍|0.1x)/},
        {name: "🇭🇰 香港节点", regex: /^(?!.*(0.5|0.5倍|0.5x|0.1|0.1倍|0.1x)).*(香港|HK|Hong|🇭🇰)/},
        {
            name: "🇹🇼 台湾节点",
            regex: /^(?!.*(0.5|0.5倍|0.5x|0.1|0.1倍|0.1x)).*(台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼)/
        },
        {
            name: "🇯🇵 日本节点",
            regex: /^(?!.*(0.5|0.5倍|0.5x|0.1|0.1倍|0.1x)).*(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|JP|Japan|🇯🇵)/
        },
        {
            name: "🇸🇬 狮城节点",
            regex: /^(?!.*(0.5|0.5倍|0.5x|0.1|0.1倍|0.1x)).*(新加坡|坡|狮城|SG|Singapore|🇸🇬)/
        },
        {name: "🇰🇷 韩国节点", regex: /^(?!.*(0.5|0.5倍|0.5x|0.1|0.1倍|0.1x)).*(韩国|首尔|Kr|Korea)/},
        {
            name: "🇳🇱 荷兰节点",
            regex: /^(?!.*(0.5|0.5倍|0.5x|0.1|0.1倍|0.1x)).*(荷兰|阿姆斯特丹|鹿特丹|莱顿|NL|Netherlands|Netherland)/
        },
        {
            name: "🇺🇲 美国节点",
            regex: /^(?!.*(0.5|0.5倍|0.5x|0.1|0.1倍|0.1x)).*(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|USA|United States|America|🇺🇸)/
        },
        {
            name: "🌐 其他地区",
            regex: /^(?!.*(香港|HK|Hong Kong|🇭🇰|HongKong|日本|川日|东京|大阪|泉日|埼玉|沪日|深日|JP|Japan|0.5|0.5倍|0.5x|0.1|0.1倍|0.1x|台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼|新加坡|坡|狮城|SG|Singapore|🇸🇬|韩国|首尔|Kr|Korea|荷兰|阿姆斯特丹|鹿特丹|莱顿|NL|Netherlands|Netherland|美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|USA|United States|America|🇺🇸)).*$/
        }

    ];

    const autoProxyGroups = areaProxyGroupRegexs
        .map((item) => ({
            name: item.name,
            type: "select",
            url: "http://www.gstatic.com/generate_204",
            // interval: 300,
            // tolerance: 50,
            proxies: getProxiesByRegex(params, item.regex),
            // hidden: true,
        }))
        .filter((item) => item.proxies.length > 0);

    const groups = [
        {
            name: proxyName,
            type: "select",
            url: "http://www.gstatic.com/generate_204",
            //icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
            proxies: [
                "🤖自动选择",
                "🕊️任性套餐",
                "🇭🇰 香港节点",
                "🇹🇼 台湾节点",
                "🇯🇵 日本节点",
                "🇸🇬 狮城节点",
                "🇰🇷 韩国节点",
                "🇳🇱 荷兰节点",
                "🇺🇲 美国节点",
                "🌐 其他地区",
                "🔀负载均衡(散列)",
                "🔁负载均衡(轮询)",
                "DIRECT",
            ],
        },
        {
            name: "🤖 高效AI",
            type: "select",
            proxies: [
                "🇳🇱 荷兰节点",
                "🇹🇼 台湾节点",
                "🇯🇵 日本节点",
                "🇸🇬 狮城节点",
                "🇰🇷 韩国节点",
                "🇺🇲 美国节点",
                "🌐 其他地区",
            ],
        }, {
            name: "📹 YouTube",
            type: "select",
            proxies: [
                /* "🎯手动选择",
                "🕊️任性套餐",
                "🇹🇼 台湾节点",
                "🇯🇵 日本节点",
                "🇸🇬 狮城节点",
                "🇰🇷 韩国节点",
                "🇳🇱 荷兰节点",
                "🇺🇲 美国节点",
                "🌐 其他地区", */
            ],
        }, {
            name: "💧 Copilot",
            type: "select",
            proxies: [
                "🇹🇼 台湾节点",
                "🎯手动选择",
                "🇯🇵 日本节点",
                "🇸🇬 狮城节点",
                "🇰🇷 韩国节点",
                "🇳🇱 荷兰节点",
                "🇺🇲 美国节点",
                "🌐 其他地区",
            ],
        }, {
            name: "🐬 OneDrive",
            type: "select",
            proxies: [
                "DIRECT",
                "🇹🇼 台湾节点",
                "🎯手动选择",
                "🇯🇵 日本节点",
                "🇸🇬 狮城节点",
                "🇰🇷 韩国节点",
                "🇳🇱 荷兰节点",
                "🇺🇲 美国节点",
                "🌐 其他地区",
            ],
        }, {
            name: "🪟 Microsoft",
            type: "select",
            proxies: [
                "DIRECT",
                "🎯手动选择",
                "🇹🇼 台湾节点",
                "🇯🇵 日本节点",
                "🇸🇬 狮城节点",
                "🇰🇷 韩国节点",
                "🇳🇱 荷兰节点",
                "🇺🇲 美国节点",
                "🌐 其他地区",
            ],
        }, {
            name: "🍃 应用净化",
            type: "select",
            proxies: [
                "REJECT",
                "DIRECT",
            ],
        },
        {
            name: "🎯手动选择",
            type: "select",
            proxies: allProxies,
        },
        {
            name: "🤖自动选择",
            type: "url-test",
            url: "http://www.gstatic.com/generate_204",
            interval: 300,
            tolerance: 50,
            proxies: allProxies,
            // hidden: true,
        },
        {
            name: "🔀负载均衡(散列)",
            type: "load-balance",
            url: "http://www.gstatic.com/generate_204",
            //icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
            interval: 300,
            "max-failed-times": 3,
            strategy: "consistent-hashing",
            lazy: true,
            proxies: allProxies,
        },
        {
            name: "🔁负载均衡(轮询)",
            type: "load-balance",
            url: "http://www.gstatic.com/generate_204",
            //icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
            interval: 300,
            "max-failed-times": 3,
            strategy: "round-robin",
            lazy: true,
            proxies: allProxies,
        },
        {
            name: "🐟漏网之鱼",
            type: "select",
            proxies: ["DIRECT", proxyName],
        },

    ];

    autoProxyGroups.length &&
    groups[2].proxies.unshift(...autoProxyGroups.map((item) => item.name));
    groups.push(...autoProxyGroups);
    params["proxy-groups"] = groups;
}

//覆写规则
function overwriteRules(params) {
    const rules = [
        "RULE-SET,self-direct,DIRECT",
        "RULE-SET,localAreaNetwork,DIRECT",
        "RULE-SET,BanProgramAD,🍃 应用净化",
        "RULE-SET,download,DIRECT",
        "RULE-SET,aiGen,🤖 高效AI",
        "RULE-SET,youTube,📹 YouTube",
        "RULE-SET,copilot,💧 Copilot",
        "RULE-SET,oneDrive,🐬 OneDrive",
        "RULE-SET,microsoft,🪟 Microsoft",
        "RULE-SET,proxyLite," + proxyName,
        "RULE-SET,direct,DIRECT",
        "RULE-SET,cncidr,DIRECT",
        "RULE-SET,lancidr,DIRECT",
        "GEOIP,LAN,DIRECT,no-resolve",
        "GEOIP,CN,DIRECT,no-resolve",
        "RULE-SET,applications,DIRECT",
        "RULE-SET,tld-not-cn," + proxyName,
        "RULE-SET,google," + proxyName,
        "RULE-SET,gfw," + proxyName,
        "RULE-SET,telegramcidr," + proxyName,
        "RULE-SET,proxy," + proxyName,
        "MATCH,🐟漏网之鱼",
    ];

    // 规则集通用配置
    const ruleProviderCommon = {
        "type": "http",
        "format": "yaml",
        "interval": 86400
    };
    // 规则集配置
    const ruleProviders = {

        "self-direct": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/Direct.txt",
            "path": "./ruleset/self/self-direct.yaml"
        },
        "localAreaNetwork": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/LocalAreaNetwork.txt",
            "path": "./ruleset/self/localAreaNetwork.yaml"
        },
        "BanProgramAD": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/BanProgramAD.txt",
            "path": "./ruleset/self/BanProgramAD.yaml"
        },
        "download": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/Download.txt",
            "path": "./ruleset/self/download.yaml"
        },
        "aiGen": {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/AI.txt",
            "path": "./ruleset/self/aiGen.yaml"
        },
        "youTube": {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/YouTube.txt",
            "path": "./ruleset/self/youTube.yaml"
        },
        "copilot": {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/Bing.txt",
            "path": "./ruleset/self/copilot.yaml"
        },
        "oneDrive": {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/OneDrive.txt",
            "path": "./ruleset/self/oneDrive.yaml"
        },
        "microsoft": {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/Microsoft.txt",
            "path": "./ruleset/self/microsoft.yaml"
        },
        "proxyLite": {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://raw.githubusercontent.com/oneyh/clash-rule/main/rule/clashVerge/ProxyLite.txt",
            "path": "./ruleset/self/proxyLite.yaml"
        },
        "direct": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
            "path": "./ruleset/loyalsoldier/direct.yaml"
        },
        "google": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
            "path": "./ruleset/loyalsoldier/google.yaml"
        },
        "proxy": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
            "path": "./ruleset/loyalsoldier/proxy.yaml"
        },
        /* "private": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
            "path": "./ruleset/loyalsoldier/private.yaml"
        }, */
        "gfw": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
            "path": "./ruleset/loyalsoldier/gfw.yaml"
        },
        "tld-not-cn": {
            ...ruleProviderCommon,
            "behavior": "domain",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
            "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
        },
        "telegramcidr": {
            ...ruleProviderCommon,
            "behavior": "ipcidr",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
            "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
        },
        "cncidr": {
            ...ruleProviderCommon,
            "behavior": "ipcidr",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
            "path": "./ruleset/loyalsoldier/cncidr.yaml"
        },
        "lancidr": {
            ...ruleProviderCommon,
            "behavior": "ipcidr",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
            "path": "./ruleset/loyalsoldier/lancidr.yaml"
        },
        "applications": {
            ...ruleProviderCommon,
            "behavior": "classical",
            "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
            "path": "./ruleset/loyalsoldier/applications.yaml"
        },
    };
    params["rule-providers"] = ruleProviders;
    params["rules"] = rules;
}

//防止dns泄露
function overwriteDns(params) {
    const cnDnsList = [
        "https://223.5.5.5/dns-query",
        "https://1.12.12.12/dns-query",
    ];
    const trustDnsList = [
        'quic://dns.cooluc.com',
        "https://1.0.0.1/dns-query",
        "https://1.1.1.1/dns-query",
    ];
    // const notionDns = 'tls://dns.jerryw.cn'
    // const notionUrls = [
    //     'http-inputs-notion.splunkcloud.com',
    //     '+.notion-static.com',
    //     '+.notion.com',
    //     '+.notion.new',
    //     '+.notion.site',
    //     '+.notion.so',
    // ]
    // const combinedUrls = notionUrls.join(',');
    const dnsOptions = {
        enable: true,
        "prefer-h3": true, // 如果DNS服务器支持DoH3会优先使用h3
        "default-nameserver": cnDnsList, // 用于解析其他DNS服务器、和节点的域名, 必须为IP, 可为加密DNS。注意这个只用来解析节点和其他的dns，其他网络请求不归他管
        nameserver: trustDnsList, // 其他网络请求都归他管

        // 这个用于覆盖上面的 nameserver
        "nameserver-policy": {
            //[combinedUrls]: notionDns,
            "geosite:cn": cnDnsList,
            "geosite:geolocation-!cn": trustDnsList,
            // 如果你有一些内网使用的DNS，应该定义在这里，多个域名用英文逗号分割
            // '+.公司域名.com, www.4399.com, +.baidu.com': '10.0.0.1'
        },
        fallback: trustDnsList,
        "fallback-filter": {
            geoip: true,
            //除了 geoip-code 配置的国家 IP, 其他的 IP 结果会被视为污染 geoip-code 配置的国家的结果会直接采用，否则将采用 fallback结果
            "geoip-code": "CN",
            //geosite 列表的内容被视为已污染，匹配到 geosite 的域名，将只使用 fallback解析，不去使用 nameserver
            geosite: ["gfw"],
            ipcidr: ["240.0.0.0/4"],
            domain: ["+.google.com", "+.facebook.com", "+.youtube.com"],
        },
    };

    // GitHub加速前缀
    const githubPrefix = "https://fastgh.lainbo.com/";

    // GEO数据GitHub资源原始下载地址
    const rawGeoxURLs = {
        geoip:
            "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
        geosite:
            "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
        mmdb: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    };

    // 生成带有加速前缀的GEO数据资源对象
    const accelURLs = Object.fromEntries(
        Object.entries(rawGeoxURLs).map(([key, githubUrl]) => [
            key,
            `${githubPrefix}${githubUrl}`,
        ])
    );

    const otherOptions = {
        "unified-delay": true,
        "tcp-concurrent": true,
        profile: {
            "store-selected": true,
            "store-fake-ip": true,
        },
        sniffer: {
            enable: true,
            sniff: {
                TLS: {
                    ports: [443, 8443],
                },
                HTTP: {
                    ports: [80, "8080-8880"],
                    "override-destination": true,
                },
            },
        },
        "geodata-mode": true,
        "geox-url": accelURLs,
    };

    params.dns = {...params.dns, ...dnsOptions};
    Object.keys(otherOptions).forEach((key) => {
        params[key] = otherOptions[key];
    });
}

function getProxiesByRegex(params, regex) {
    return params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
}
