passwords = {
    "3189248480": "phone",
    "3239844826": "ianiscool",
    "1924436689": "sallehjuaraku",
    "3244952112": "iannana",
    "1275513740": "chronos",
    "3420548383": "222",
    "1321506047": "123",
    "1646787699": "nadhirah",
    "2801840183": "ianismydaddy",
    "1679379474": "milo5559",
    "3108794565": "jh75"
}

users = {
    "1275513740": {
        "id": 1275513740,
        "username": "han_yuji_",
        "wallets": {
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 13999863409.1,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 16000136922.0
            },
            "2": {
                "id": 2,
                "name": "I renamed this wallet",
                "balance": 1000.0,
                "colour": 1,
                "limit": "Unlimited",
                "expenditure": 1246.0
            },
            "1": {
                "id": 1,
                "name": "savings for Korea",
                "balance": 1002122.0,
                "colour": 3,
                "limit": {
                    "Weekly": 1000.0
                },
                "expenditure": 0.0
            }
        }
    },
    "3244952112": {
        "id": 3244952112,
        "username": "iannana",
        "wallets": {
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 1000000030.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.0
            }
        }
    },
    "3189248480": {
        "id": 3189248480,
        "username": "mobile",
        "wallets": {
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 885.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 115.0
            }
        }
    },
    "3239844826": {
        "id": 3239844826,
        "username": "anastasia",
        "wallets": {
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 135801.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.0
            }
        }
    },
    "1924436689": {
        "id": 1924436689,
        "username": "alepsallehiananna",
        "wallets": {
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 2000000000.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.0
            }
        }
    },
    "1679379474": {
        "id": 1679379474,
        "username": "elenashizuka@hotmail.com",
        "wallets": {
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 9998999999.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.0
            }
        }
    },
    "3420548383": {
        "id": 3420548383,
        "username": "bangla222",
        "wallets": {
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 0.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.0
            }
        }
    },
    "3108794565": {
        "id": 3108794565,
        "username": "jasonhon",
        "wallets": {
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 1000000000.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.0
            }
        }
    },
    "1321506047": {
        "id": 1321506047,
        "username": "zot",
        "wallets": {
            "1": {
                "id": 1,
                "name": "Sussy",
                "balance": 0.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.0
            },
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 999.9,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.1
            }
        }
    },
    "2801840183": {
        "id": 2801840183,
        "username": "weewoo",
        "wallets": {
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 3000.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.0
            }
        }
    },
    "1646787699": {
        "id": 1646787699,
        "username": "nlndhrhs",
        "wallets": {
            "1": {
                "id": 1,
                "name": "Wedding",
                "balance": 0.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 0.0
            },
            "0": {
                "id": 0,
                "name": "wallet",
                "balance": 2000000000.0,
                "colour": 0,
                "limit": "Unlimited",
                "expenditure": 500.0
            }
        }
    }
}

result = {}
for u_id, i in users.items():
    result[u_id] = [u_id, i['username']]

for u_id, p in passwords.items():
    result[u_id].append(p)

for i in result.values():
    print(f"\"{i[1]}\":[{i[0]},\"{i[2]}\"],")
