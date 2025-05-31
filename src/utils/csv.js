export function parseAndCleanCSVData(rawRows) {
    return rawRows
        .map(row => {

            const cleanRow = { ...row };
            for (const key in cleanRow) {
                if (typeof cleanRow[key] === 'string') {

                    cleanRow[key] = cleanRow[key]
                        .replace(/\./g, '')
                        .replace(/,/g, '.')
                        .trim();
                }
            }

            cleanRow['Centil'] = Number(cleanRow['Centil']);
            return cleanRow;
        })
        .filter(row =>
            !isNaN(row['Centil']) &&
            row['Centil'] >= 1 &&
            row['Centil'] <= 100
        );
}

export function getRendaGroup(centil) {
    if (centil <= 33) return 'baixa';
    if (centil <= 66) return 'media';
    return 'alta';
}