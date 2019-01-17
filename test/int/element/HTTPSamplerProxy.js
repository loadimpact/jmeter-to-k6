/* eslint-disable no-template-curly-in-string */

import test from 'ava'
import parseXml from '@rgrove/parse-xml'
import HTTPSamplerProxy from 'element/HTTPSamplerProxy'

test('minimal', t => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<HTTPSamplerProxy>
  <stringProp name="method">GET</stringProp>
  <stringProp name="protocol">http</stringProp>
  <stringProp name="domain">example.com</stringProp>
</HTTPSamplerProxy>
`
  const tree = parseXml(xml)
  const node = tree.children[0]
  const result = HTTPSamplerProxy(node)
  t.is(result.logic, `

r = http.request(
  ${'`GET`'},
  ${'`${`http`}://${`example.com`}`'},
  {
    redirects: 0
  }
)`)
})

test('path', t => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<HTTPSamplerProxy>
  <stringProp name="method">GET</stringProp>
  <stringProp name="protocol">http</stringProp>
  <stringProp name="domain">example.com</stringProp>
  <stringProp name="path">/index.html</stringProp>
</HTTPSamplerProxy>
`
  const tree = parseXml(xml)
  const node = tree.children[0]
  const result = HTTPSamplerProxy(node)
  t.is(result.logic, `

r = http.request(
  ${'`GET`'},
  ${'`${`http`}://${`example.com`}${`/index.html`}`'},
  {
    redirects: 0
  }
)`)
})

test('address in path', t => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<HTTPSamplerProxy>
  <stringProp name="method">GET</stringProp>
  <stringProp name="path">http://example.com/index.html</stringProp>
</HTTPSamplerProxy>
`
  const tree = parseXml(xml)
  const node = tree.children[0]
  const result = HTTPSamplerProxy(node)
  t.is(result.logic, `

r = http.request(
  ${'`GET`'},
  ${'`http://example.com/index.html`'},
  {
    redirects: 0
  }
)`)
})

test('port', t => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<HTTPSamplerProxy>
  <stringProp name="method">GET</stringProp>
  <stringProp name="protocol">http</stringProp>
  <stringProp name="domain">example.com</stringProp>
  <stringProp name="port">88</stringProp>
</HTTPSamplerProxy>
`
  const tree = parseXml(xml)
  const node = tree.children[0]
  const result = HTTPSamplerProxy(node)
  t.is(result.logic, `

r = http.request(
  ${'`GET`'},
  ${'`${`http`}://${`example.com`}:${`88`}`'},
  {
    redirects: 0
  }
)`)
})

test('timeout', t => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<HTTPSamplerProxy>
  <stringProp name="method">GET</stringProp>
  <stringProp name="protocol">http</stringProp>
  <stringProp name="domain">example.com</stringProp>
  <stringProp name="response_timeout">300</stringProp>
</HTTPSamplerProxy>
`
  const tree = parseXml(xml)
  const node = tree.children[0]
  const result = HTTPSamplerProxy(node)
  t.is(result.logic, `

r = http.request(
  ${'`GET`'},
  ${'`${`http`}://${`example.com`}`'},
  {
    redirects: 0,
    timeout: Number.parseInt(${'`300`'}, 10)
  }
)`)
})

test('encoding', t => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<HTTPSamplerProxy>
  <stringProp name="method">GET</stringProp>
  <stringProp name="protocol">http</stringProp>
  <stringProp name="domain">example.com</stringProp>
  <stringProp name="contentEncoding">compress</stringProp>
</HTTPSamplerProxy>
`
  const tree = parseXml(xml)
  const node = tree.children[0]
  const result = HTTPSamplerProxy(node)
  t.is(result.logic, `

r = http.request(
  ${'`GET`'},
  ${'`${`http`}://${`example.com`}`'},
  {
    redirects: 0,
    headers: {
      'Content-Encoding': ${'`compress`'}
    }
  }
)`)
})

test('redirect silent', t => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<HTTPSamplerProxy>
  <stringProp name="method">GET</stringProp>
  <stringProp name="protocol">http</stringProp>
  <stringProp name="domain">example.com</stringProp>
  <boolProp name="auto_redirects">true</boolProp>
</HTTPSamplerProxy>
`
  const tree = parseXml(xml)
  const node = tree.children[0]
  const result = HTTPSamplerProxy(node)
  t.is(result.logic, `

r = http.request(
  ${'`GET`'},
  ${'`${`http`}://${`example.com`}`'},
  {
    redirects: 999
  }
)`)
})
