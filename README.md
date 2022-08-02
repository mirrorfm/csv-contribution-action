# csv-contribution-action

A Github Action that checks contributions to CSV files.
Made for [mirrorfm-data](https://github.com/mirrorfm/mirrorfm-data), a data-as-code repository.

## Inputs

## `file-content`

**Required** The content of the file to check. Default `""`.

## `find-duplicates`

**Required** The content of the file to check. Default `"false"`.

## Example usage

    uses: stephanebruckert/csv-contributions@v1.0.0
    with:
        file-content: 'a,b,c\na,b,c'
        find-duplicates: 'true'

A live example can be found [here](https://github.com/mirrorfm/mirrorfm-data/blob/master/.github/workflows/csv-lint.yml).