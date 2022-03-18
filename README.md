# dirtyXML

XML parsing and manipulation using Regex - get dirty and feel dirty.

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
          <li>Able to work directly with unsanitized ("dirty") XML, or XML data that triggers parsing error in a proper XML parser</li>
          <li>Doesn't need to deal with namespacing, when it's not relevant to the task at hand</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>API request and response (simple and predictable structures)</li>
          <li>XML export from business applications (often poorly coded and trigger error with proper XML parsers)</li>
          <li>Where the power of a proper parser is not needed and a lightweight solution is preferred</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Handles nested elements with the same name poorly</li>
          <li>Ignores namespace, which could be viewed as a feature</li>
          <li>Ignores attributes (for now, may add in the future), however will leave them in place</li>
        </ul>
      </td>
      <tr>
  </tbody>
  </table>

## XML Manipulation

XML manipulation using `XM()` function.

Either invoke it directly as `XM(string)`, or create a new instance `let data = new XM(string)`.

Of course, you will need to access its methods in order to manipulate and retrieve data.

All methods can be chained except those that returns a string.

| Method | Description |
| --- | --- |
| `fill(element, string)` | Replace element content |
| `replace(element, string)` | Replace element |
| `prepend(element, string)` | Insert string into element, at the beginning |
| `append(element, string)` | Insert string into element, at the end |
| `before(element, string)` |  Insert string before element |
| `after(element, string)` |  Insert string after element |
| `remove(...element)` | Remove element(s), accept multiple arguments to remove multiple elements at once |
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
