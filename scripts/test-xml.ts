import * as xml2js from 'xml2js';

const xml = `
<item>
    <category domain="category" nicename="jejak-pikiran"><![CDATA[Jejak Pikiran]]></category>
    <category domain="post_tag" nicename="psikologi"><![CDATA[Psikologi]]></category>
</item>
`;

async function test() {
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);
    console.log(JSON.stringify(result, null, 2));
}

test();
