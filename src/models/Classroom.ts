export enum CLASS_MODULE {
    CLASS_MODULE_0 = "0",
    CLASS_MODULE_1 = "1",
    CLASS_MODULE_2 = "2",
    CLASS_MODULE_3 = "3",
    CLASS_MODULE_4 = "4",
    CLASS_MODULE_5 = "5",
    CLASS_MODULE_6 = "6",
}

export interface IClassroomDB {
    id: string,
    name: string,
    module: CLASS_MODULE
}

export class Classroom {
    constructor(
        private id: string,
        private name: string,
        private module: CLASS_MODULE
    ) { }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getModule(): CLASS_MODULE {
        return this.module;
    }

    public setId(newId: string) {
        this.id = newId;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public setModule(newModule: CLASS_MODULE) {
        this.module = newModule;
    }
}