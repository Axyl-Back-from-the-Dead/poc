import { after, before, instead } from "spitroast";

type Unpatcher = () => (void | boolean);

type BeforeCallback = Parameters<typeof before>[2];
type AfterCallback = Parameters<typeof after>[2];
type InsteadCallback = Parameters<typeof instead>[2];

type NotPrimitive<T> = Exclude<T, boolean | number | bigint | string | symbol>;

export const patchesInstances = new Map<string, Patcher>();

export default class Patcher {
    identifier: string;
    patches: Unpatcher[] = [];
    stopped = false;

    constructor(identifier: string) {
        if (!identifier || typeof identifier !== "string") {
            throw new Error("Patcher identifier must be a non-empty string");
        }

        if (patchesInstances.has(identifier)) {
            throw new Error(`Patcher with identifier "${identifier}" already exists`);
        }

        this.identifier = identifier;
        patchesInstances.set(identifier, this);
    }

    before<T>(parent: NotPrimitive<T>, method: string, patch: BeforeCallback) {
        return this.addUnpatcher(before(method, parent, patch));
    }

    after<T>(parent: NotPrimitive<T>, method: string, patch: AfterCallback) {
        return this.addUnpatcher(after(method, parent, patch));
    }

    instead<T>(parent: NotPrimitive<T>, method: string, patch: InsteadCallback) {
        return this.addUnpatcher(instead(method, parent, patch));
    }

    unpatchAllAndStop = () => {
        let success = true;
        this.stopped = true;

        for (const unpatch of this.patches) {
            try {
                if (!unpatch?.()) throw void 0;
            } catch {
                success = false;
            }
        }

        patchesInstances.delete(this.identifier);
        return success;
    };

    addUnpatcher = (callback: Unpatcher) => {
        if (this.stopped) return () => false;
        if (typeof callback !== "function") {
            throw new Error("Unpatcher must be a function");
        }

        this.patches.push(callback as () => boolean);
        return callback;
    };
}
