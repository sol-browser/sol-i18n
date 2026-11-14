# Sol translations

Interface translations for the [Sol browser](https://github.com/sol-browser/sol). The English catalog is the source. The Ukrainian catalog contains the initial translation.

## Contributing

[![Help translate Sol](https://img.shields.io/badge/Help_translate_Sol-167D6D?style=for-the-badge&logo=weblate&logoColor=white)](https://translate.sol-browser.app/engage/sol-browser/)

Choose your language in Weblate, enter your translation, and click **Suggest**. Guests can submit suggestions. Signed-in contributors can vote, and Weblate accepts a suggestion after two votes.

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
