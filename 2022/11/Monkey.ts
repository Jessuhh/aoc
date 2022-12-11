export type Operation = {
    operator: string;
    value1: number | "old";
    value2: number | "old";
};

export type Test = {
    value: number;
    true: number;
    false: number;
};

export default class Monkey {
    items: Array<number>;
    operation: Operation;
    test: Test;
    inspectCount = 0;

    constructor(startingItems: Array<number>, operation: Operation, test: Test) {
        this.items = startingItems;
        this.operation = operation;
        this.test = test;
    }

    executeOperation(item: number) {
        const value1 = this.operation.value1 === "old" ? item : this.operation.value1;
        const value2 = this.operation.value2 === "old" ? item : this.operation.value2;
        switch (this.operation.operator) {
            case "+":
                return value1 + value2;
            case "*":
                return value1 * value2;
        }
        // Should not be reached
        return 0;
    }

    executeTest(item: number) {
        if (item % this.test.value === 0) {
            return this.test.true;
        } else {
            return this.test.false;
        }
    }
}
