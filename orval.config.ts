export default {
    api: {
        input: {
            target: "./src/api/openapi.sanitized.json",
        },
        output: {
            target: "./src/api/generated.ts",
            client: "react-query",
            override: {
                mutator: {
                    path: "./src/api/mutator/custom-instance.ts",
                    name: "customInstance",
                },
            },
        },
    },
};
