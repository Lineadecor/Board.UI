export class JSonUtil {
    static deSerialize<T>(obj: T, json: any) : T {
        var jsonObj = JSON.parse(json);

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }

    static serialize<T>(obj: T) : string {
        var jsonString = JSON.stringify(obj);
        return jsonString;
    }
}