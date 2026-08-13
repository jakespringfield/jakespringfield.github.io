# Sample Public Bug Evidence Decision Brief

This is an independent retrospective sample of the $29 brief format, not customer work, a paid engagement, or an endorsement by Appwrite. Public state was checked on 2026-08-12. OpenAI Codex materially assisted evidence organization and drafting; no separate human review is claimed.

## Decision

**SUPPORTED_BY_PUBLIC_EVIDENCE / GO:** preserve the issue as a supported diagnostic-text defect and run one bounded acceptance check before calling it resolved.

The public source record supports a mismatch between the configuration variable used by the Site deployment size check and the variable named in its error message. The result has not been independently reproduced at runtime.

## Frozen question

When an Appwrite Site archive exceeds the configured Site upload limit, does the public evidence support changing the returned configuration guidance from `_APP_STORAGE_LIMIT` to `_APP_COMPUTE_SIZE_LIMIT`?

## Source ledger

| Public source | What it establishes | Evidence class |
| --- | --- | --- |
| [Issue #9904](https://github.com/appwrite/appwrite/issues/9904) | The reporter describes an oversize Site upload response that names `_APP_STORAGE_LIMIT`. The issue is open. | Reporter-reported |
| [Released Site deployment source, 1.9.6](https://github.com/appwrite/appwrite/blob/1.9.6/src/Appwrite/Platform/Modules/Sites/Http/Deployments/Create.php) | The endpoint reads `_APP_COMPUTE_SIZE_LIMIT`, compares it with the uploaded archive size, and throws `STORAGE_INVALID_FILE_SIZE`. | Verified public source |
| [Released error configuration, 1.9.6](https://github.com/appwrite/appwrite/blob/1.9.6/app/config/errors.php) | The corresponding public error text names `_APP_STORAGE_LIMIT`. | Verified public source |

## Why this is not a reproduction claim

The review did not run Appwrite, upload an archive, call an API, or execute the proposed branch. Static source alignment can support the reported mismatch, but it cannot prove the behavior of a buyer's packaged image, proxy, configuration, or deployed release.

## Decisive evidence gap

A preserved response from an authorized disposable Appwrite stack running a pinned correction candidate, with the Site limit set below a known test archive size.

## Proposed buyer-run acceptance check

In a buyer-owned disposable environment:

1. Set `_APP_COMPUTE_SIZE_LIMIT` to a known small value before startup.
2. Submit an archive that exceeds that value to a disposable Site.
3. Preserve the request metadata, HTTP status, response type, response message, and deployment list.
4. Pass only if the response is HTTP 400, uses the proposed Site-specific error type, names `_APP_COMPUTE_SIZE_LIMIT`, does not name `_APP_STORAGE_LIMIT`, and creates no deployment.

This is an acceptance boundary, not an executed test. The buyer remains responsible for authorization, isolation, credentials, and the exact commands used in its environment.

## Smallest defensible next step

Run the buyer-owned acceptance check against a pinned correction candidate. If it passes, preserve the result for maintainer review. Do not close the issue as shipped until a correcting commit is merged and included in an official release.

## Limits

- No runtime reproduction was performed.
- Contributor test statements are reported claims unless independently preserved and verified.
- A proposed correction does not establish maintainer approval, mergeability, release inclusion, or regression safety.
- The packet addresses public, non-security evidence only and excludes implementation work.
