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