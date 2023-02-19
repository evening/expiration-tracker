from dataclasses import dataclass, asdict
import json

with open("foodkeeper.json", encoding="utf8") as f:
    data = json.load(f)


# the schema of foodkeeper.json
@dataclass
class Row:
    ID: str = None
    Category_ID: str = None
    Name: str = None
    Name_subtitle: str = None
    Keywords: str = None
    Pantry_Min: int = None
    Pantry_Max: int = None
    Pantry_Metric: str = None
    Pantry_tips: str = None
    DOP_Pantry_Min: int = None
    DOP_Pantry_Max: int = None
    DOP_Pantry_Metric: str = None
    DOP_Pantry_tips: str = None
    Pantry_After_Opening_Min: int = None
    Pantry_After_Opening_Max: int = None
    Pantry_After_Opening_Metric: str = None
    Refrigerate_Min: int = None
    Refrigerate_Max: int = None
    Refrigerate_Metric: str = None
    Refrigerate_tips: str = None
    DOP_Refrigerate_Min: int = None
    DOP_Refrigerate_Max: int = None
    DOP_Refrigerate_Metric: str = None
    DOP_Refrigerate_tips: str = None
    Refrigerate_After_Opening_Min: int = None
    Refrigerate_After_Opening_Max: int = None
    Refrigerate_After_Opening_Metric: str = None
    Refrigerate_After_Thawing_Min: int = None
    Refrigerate_After_Thawing_Max: int = None
    Refrigerate_After_Thawing_Metric: str = None
    Freeze_Min: int = None
    Freeze_Max: int = None
    Freeze_Metric: str = None
    Freeze_Tips: str = None
    DOP_Freeze_Min: int = None
    DOP_Freeze_Max: int = None
    DOP_Freeze_Metric: str = None
    DOP_Freeze_Tips: str = None

    def get_pantry(self) -> str:
        if self.DOP_Pantry_Max and self.DOP_Pantry_Metric:
            return f"{self.DOP_Pantry_Max} {self.DOP_Pantry_Metric}"
        if self.Pantry_Max and self.Pantry_Metric:
            return f"{self.Pantry_Max} {self.Pantry_Metric}"
        return None

    def get_pantry_opened(self) -> str:
        if self.Pantry_After_Opening_Max and self.Pantry_After_Opening_Metric:
            return f"{self.Pantry_After_Opening_Max} {self.Pantry_After_Opening_Metric}"
        return None

    def get_fridge_opened(self) -> str:
        if self.Refrigerate_After_Opening_Max and self.Refrigerate_After_Opening_Metric:
            return f"{self.Refrigerate_After_Opening_Max} {self.Refrigerate_After_Opening_Metric}"
        return None

    def get_fridge(self):
        length = metric = None
        if self.Refrigerate_After_Opening_Max and self.Refrigerate_After_Opening_Metric:
            length = self.Refrigerate_After_Opening_Max
            metric = self.Refrigerate_After_Opening_Metric
        elif self.DOP_Refrigerate_Max and self.DOP_Refrigerate_Metric:
            length = self.DOP_Refrigerate_Max
            metric = self.DOP_Refrigerate_Metric
        elif self.Refrigerate_Max and self.Refrigerate_Metric:
            length = self.Refrigerate_Max
            metric = self.Refrigerate_Metric
        if length and metric:
            return f"{length} {metric}"
        return None

    def get_freezer(self):
        length = metric = None
        if self.DOP_Freeze_Max and self.DOP_Freeze_Metric:
            return f"{self.DOP_Freeze_Max} {self.DOP_Freeze_Metric}"
        if self.Freeze_Max and self.Freeze_Metric:
            return f"{self.Freeze_Max} {self.Freeze_Metric}"
        return None


products = []
for product in data["sheets"][2]["data"]:
    product_object = Row()
    for col in product:
        col_name = list(col.keys())[0]
        if col[col_name] is None:
            continue
        try:
            typing = Row.__annotations__[col_name]
            col_value = col[col_name]
            col_value = Row.__annotations__[col_name](col_value)
            if typing == str:
                col_value = str(col[col_name]).strip()
            setattr(product_object, col_name, col_value)
        except (ValueError, TypeError):
            setattr(product_object, col_name, col[col_name])
    products.append(product_object)


@dataclass
class SimpleEntry:
    # ID: int = None
    name: str = None
    name_subtitle: str = None
    pantry: str = None
    fridge: str = None
    freezer: str = None
    pantry_opened: str = None
    fridge_opened: str = None


products_map = dict() # product full name -> product
keyword_map = dict() # keyword -> list of product full names

for v in products:
    product = SimpleEntry()
    # product.ID = v.ID
    product.name = v.Name
    product.name_subtitle = v.Name_subtitle

    full_name = product.name
    if product.name_subtitle != None:
        full_name += f" ({product.name_subtitle})"
    product.pantry = v.get_pantry()
    product.pantry_opened = v.get_pantry_opened()
    product.fridge = v.get_fridge()
    product.fridge_opened = v.get_fridge_opened()
    product.freezer = v.get_freezer()
    products_map[full_name] = asdict(product)

    keywords = list() if not v.Keywords else map(lambda x: x.strip(), v.Keywords.lower().split(","))
    for keyword in filter(None, keywords):
        if keyword not in keyword_map:
            keyword_map[keyword] = list()
        keyword_map[keyword].append(full_name)

with open("keywords.json", "w", encoding="utf8") as f:
    json.dump(keyword_map, f, indent=4, sort_keys=True, ensure_ascii=False)
with open("products.json", "w", encoding="utf8") as f:
    json.dump(products_map, f, indent=4, sort_keys=True, ensure_ascii=False)
