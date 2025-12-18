export { parseInfo, extractInfo, removeInfo, extractMainInfo, removeMainInfo };

function parseInfo(input, splits = { tags: ' ' }) {
    return input
        .split(';')
        .filter(line => line.trim())
        .reduce((acc, line) => {
            let [key, value] = line.split(':').map(s => s.trim());

            if (key && value) {
                const cleanValue = value.replace(/\s+/g, ' ');
                acc[key] = splits[key] ? cleanValue.split(splits[key]) : cleanValue;
            }
            return acc;
        }, {});
}

function extractInfo(input) {
    const regex = /<info>([\s\S]*?)<\/info>/;
    const match = input.match(regex);
    return match ? match[1].trim() : '';
}

function removeInfo(input) {
    return input.replace(/<info>[\s\S]*?<\/info>/, '').trim();
}

function extractMainInfo(input) {
    const headingRegex = /^#\s+(.+)/m;
    const thumbRegex = /!\[thumbnail\]\((.*?)\)/;

    const headingMatch = input.match(headingRegex);
    const thumbMatch = input.match(thumbRegex);

    return {
        heading: headingMatch ? headingMatch[1].trim() : null,
        thumbnail: thumbMatch ? thumbMatch[1].trim() : null
    };
}

function removeMainInfo(input) {
    return input
        .replace(/^#\s+.+$/m, '')
        .replace(/^!\[thumbnail\].+$/m, '')
        .trim();
}
