# csv-contribution-action

A Github Action that checks contributions to CSV files

## Inputs

## `file-content`

**Required** The content of the file to check. Default `""`.

## Example usage

uses: stephanebruckert/csv-contributions@v1.0.0
with:
    file-content: 'a,b,c\na,b,c'