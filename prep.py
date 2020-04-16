# %%
import pandas as pd
import json

# %%
d = pd.read_excel('ceny_vyber.xlsx')
d.datum = pd.to_datetime(d.datum, format='%d.%m.%Y')
d = d[d.pouzit == 'ano']

#%%
def dph(val, comm):
    if comm == 'bez DPH':
        return val * 1.21
    else:
        return val

d.kus_DPH = d.apply(lambda row: dph(row['kus_DPH'], row['pozn']), axis=1)

#%%
dat = d[['subjekt', 'datum', 'typ','kus_DPH']]
#dat = d.groupby(['subjekt', 'datum', 'typ']).kus_DPH.mean()

#%%
data = pd.DataFrame(dat.reset_index())

# %%
out = {}
for row in list(data.sort_values(by='datum').to_dict(orient='index').values()):
    if row['subjekt'] not in out:
        out[row['subjekt']] = {}
    if row['typ'] not in out[row['subjekt']]:
        out[row['subjekt']][row['typ']] = []
        
    out[row['subjekt']][row['typ']].append(
        [
            str(row['datum']),
            row['kus_DPH']
        ]
    )

# %%
with open('./data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(out, ensure_ascii=False))

# %%
len(out.keys())


# %%
