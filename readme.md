# Khmer normalize

Normalize Khmer scripts into a form that searchable.

## Usage

Installation

```shell
npm install khmer-normalize
```

Usage 

```js
import { reorderText } from 'khmer-normalize';
const { reorderText } = require('khmer-normalize');

const result = reorderText("ស្រ្តី")
// => ស្រ្តី
```


> ⚠️ **Caveats**
> This library transforms text into a form that can be used for text-indexing it's not intended for displaying!

## References

Thanks to [Trey314159/KhmerSyllableReordering](https://github.com/Trey314159/KhmerSyllableReordering)

## Related

- [khmercal](https://github.com/seanghay/khmercal)
- [khmerword](https://github.com/seanghay/khmerword)
- [khmernumber](https://github.com/seanghay/khmernumber)
- [is-khmer](https://github.com/seanghay/is-khmer)
- [split-khmer](https://github.com/seanghay/split-khmer)