function normalizeString(str) {
    return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
}

function filterData(data, term) {
    if (!term) return data;

    const tokens = term.split(/\s+/).filter(token => token.length > 0).map(token => normalizeString(token));

    return data.filter(item => {
        const searchableString = normalizeString(`${item.coluna_a} ${item.coluna_b} ${item.coluna_d}`);
        return tokens.every(token => searchableString.includes(token));
    });
}

const allData = [
    { coluna_a: "105976113", coluna_b: "Cássia da Silva Mota", coluna_d: "Growth Group" },
    { coluna_a: "12345", coluna_b: "João Silva", coluna_d: "RH" }
];

const testCases = [
    { term: "105 cassia growth", expectedCount: 1 },
    { term: "cassia silva 1059 group", expectedCount: 1 },
    { term: "mota cassia", expectedCount: 1 },
    { term: "1059", expectedCount: 1 },
    { term: "silva", expectedCount: 2 },
    { term: "joao 123", expectedCount: 1 },
    { term: "inexistente", expectedCount: 0 }
];

let allPassed = true;
testCases.forEach(tc => {
    const result = filterData(allData, tc.term);
    if (result.length === tc.expectedCount) {
        console.log(`PASS: "${tc.term}" found ${result.length} items.`);
    } else {
        console.error(`FAIL: "${tc.term}" expected ${tc.expectedCount} items, but found ${result.length}.`);
        allPassed = false;
    }
});

if (!allPassed) {
    process.exit(1);
}
