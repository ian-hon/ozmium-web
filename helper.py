a = [
    ["methane", ["meth", "ane"]],
    ["ethene", ["eth", "ene"]],
    ["hex-4-yne", ["hex", "yne"]],
    ["hexan-2-ol", ["hexan", "ol"]],
    ["ethanoic acid", ["eth", "anoic acid"]],
    ["1,1,1-trichloroethane", ["eth", "ane"]]
]

for x in a:
    final: str = x[0]
    for i in x[1]:
        final = final.replace(i, "")
    final = final.removeprefix('-')
    final = final.removesuffix('-')
    print(final)
