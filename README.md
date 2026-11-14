# Sol translations

Interface translations for the [Sol browser](https://github.com/sol-browser/sol). The English catalog is the source. The Ukrainian catalog contains the initial translation.

## Contributing

The community translation editor will be hosted on Weblate. Its project link will appear here when the editor is available. Translators will be able to suggest wording and vote on suggestions in the editor. The planned workflow accepts a suggestion after two votes and uses community review.

Use the [glossary](GLOSSARY.md) to keep browser terms consistent. Keep ICU placeholders such as `{name}` and `{count}` and use the plural forms appropriate for your language. A missing translation falls back to English in Sol. Message IDs remain stable when wording changes.

## Maintainer setup

| Weblate setting | Value |
| --- | --- |
| Repository | `https://github.com/sol-browser/sol-i18n.git` |
| Branch | `main` |
| File format | Format.JS JSON file (`formatjs`) |
| File mask | `catalogs/*.json` |
| Monolingual base file | `catalogs/en.json` |
| Enable suggestions and suggestion voting | On |
| Automatically accept suggestions | 2 votes |
| Dedicated reviewer groups | None |

See the [FormatJS setup](https://docs.weblate.org/en/latest/formats/formatjs.html) and [peer review workflow](https://docs.weblate.org/en/latest/workflows.html#peer-review).

Export source changes from Sol and import reviewed catalogs at a recorded commit. Validate each catalog with `npm ci` and `npm test`. CI allows incomplete catalogs and checks message IDs, ICU syntax and arguments. Native entries use plain text with an optional literal `{name}` argument.

The catalogs and supporting files use the [Mozilla Public License 2.0](LICENSE).
