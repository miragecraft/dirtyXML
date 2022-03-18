# dirtyXML.js

XML querying and manipulation in JavaScript using Regex - get dirty and feel dirty.

<table>
  <thead>
  <tr>
    <th>Why</th>
      <th>When</th>
    <th>Limitation</th>

  </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li>Less code, more clarity to perform simple manipulation and data retrieval</li>
          <li>Able to work directly with unsanitized ("dirty") XML, which would require painstaking cleanup if a proper XML parser is used instead</li>
          <li>Doesn't need to deal with namespacing, when it's not relevant to the task at hand</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>API request and response (simple and predictable structures)</li>
          <li>XML export from business applications (often poorly coded and unsanitized)</li>
          <li>Where the power of a proper parser is not needed and a lightweight solution is preferred</li>
          <li>One off parsing of XML data where speed and simplicity trumps all</li> 
        </ul>
      </td>
      <td>
        <ul>
          <li>Can't handle nested elements with the same name (will pick the first end tag)</li>
          <li>Ignores namespace and leave in place, also a feature</li>
          <li>Ignores attributes and leave in place *</li>
        </ul>
      </td>
    <tr>
</tbody>
</table>
  
\* Currently for what I use this for, I don't need to manipulate or read attributes so they are not supported, if I need it later I'll add it in.

## XML Querying and Manipulation

Initialize with `XM()` function, you can optionally supply it with a `string`, or start with a blank slate.

Either invoke it directly as `XM(string)`, or create save it to an oject as a new instance: `let data = new XM(string)`.

Access its methods to manipulate and retrieve data (chainable except those that returns a string).

| Method | Description |
| --- | --- |
| `fill(element, string)` | Replace element content |
| `replace(element, string)` | Replace element |
| `prepend(element, string)` | Insert string into element, at the beginning |
| `append(element, string)` | Insert string into element, at the end |
| `before(element, string)` |  Insert string before element |
| `after(element, string)` |  Insert string after element |
| `remove(...element)` | Remove element(s), accept multiple element names as arguments |
| `empty(element)` | Empty element, remove all content |
| `get(element)` | Return content of first element as string, cannot be chained |
| `getAll(element)` | Return content of all elements as array of strings, cannot be chained |
| `render()` | Return XML string, cannot be chained |

*Example*
```JavaScript
XM(`
  <note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
  </note>
`)
.fill('to','John')
.empty('from')
.after('heading','<date>2022-03-17</date>')
.render();

/*
  <note>
    <to>John</to>
    <from></from>
    <heading>Reminder</heading>
    <date>2022-03-17</date>
    <body>Don't forget me this weekend!</body>
  </note>
*/

XM(`
  <note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
  </note>
`)
.get('heading');

/*
Reminder
*/

XM(`
  <cars>
    <car>Honda</car>
    <car>Toyota</car>
    <car>Dodge</car>
    <car>Chrysler</car>
  </cars>
`)
.getAll('car');

/*
['Honda','Toyota','Dodge','Chrysler']
*/
```
## XML Construction

A helper construction function `X()` is provided to convert objects into XML.

```
X({
  note:{
    to:'Tove',
    from:'Jani',
    heading:'Reminder',
    body:'Don\'t forget me this weekend!',
 }
});

/*
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
*/
```

It can also handle arrays

```
X({
  cars:{
    car:['Honda','Toyota','Dodge','Chrysler']
  }
});

/*
<cars>
  <car>Honda</car>
  <car>Toyota</car>
  <car>Dodge</car>
  <car>Chrysler</car>
</cars>
*/
```

Use this power responsibly and have fun.
