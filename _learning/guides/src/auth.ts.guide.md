# Guide: src/auth.ts

## Purpose
This file configures NextAuth providers, credential verification, and session callbacks for identity handling.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import NextAuth, { type NextAuthConfig } from "next-auth";` imports from `next-auth` so this module can use that dependency.
- L2: `import Credentials from "next-auth/providers/credentials";` imports from `next-auth/providers/credentials` so this module can use that dependency.
- L3: `import GitHub from "next-auth/providers/github";` imports from `next-auth/providers/github` so this module can use that dependency.
- L4: `import { eq } from "drizzle-orm";` imports from `drizzle-orm` so this module can use that dependency.
- L5: `import { db } from "@/lib/db";` imports from `@/lib/db` so this module can use that dependency.
- L6: `import { users } from "@/lib/db/schema";` imports from `@/lib/db/schema` so this module can use that dependency.
- L7: `import { verifyPassword } from "@/lib/utils/crypto";` imports from `@/lib/utils/crypto` so this module can use that dependency.

### Functions and components
- No named function/class declarations were detected; behavior may be configuration/data declarations.

### Ordered walkthrough
- L1: `import NextAuth, { type NextAuthConfig } from "next-auth";` - Imports a dependency so this module can use external functionality.
- L2: `import Credentials from "next-auth/providers/credentials";` - Imports a dependency so this module can use external functionality.
- L3: `import GitHub from "next-auth/providers/github";` - Imports a dependency so this module can use external functionality.
- L4: `import { eq } from "drizzle-orm";` - Imports a dependency so this module can use external functionality.
- L5: `import { db } from "@/lib/db";` - Imports a dependency so this module can use external functionality.
- L6: `import { users } from "@/lib/db/schema";` - Imports a dependency so this module can use external functionality.
- L7: `import { verifyPassword } from "@/lib/utils/crypto";` - Imports a dependency so this module can use external functionality.
- L9: `const githubClientId = process.env.GITHUB_CLIENT_ID;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L10: `const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L12: `const providers: NextAuthConfig["providers"] = [` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L13: `Credentials({` - Contributes to the local implementation details in this scope.
- L14: `name: "Email & Password",` - Contributes to the local implementation details in this scope.
- L15: `credentials: {` - Contributes to the local implementation details in this scope.
- L16: `email: { label: "Email", type: "email" },` - Contributes to the local implementation details in this scope.
- L17: `password: { label: "Password", type: "password" },` - Contributes to the local implementation details in this scope.
- L18: `},` - Contributes to the local implementation details in this scope.
- L19: `async authorize(credentials) {` - Contributes to the local implementation details in this scope.
- L20: `const email = typeof credentials?.email === "string" ? credentials.email : "";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L21: `const password = typeof credentials?.password === "string" ? credentials.password : "";` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L23: `if (!email || !password) {` - Branches control flow so different code paths run under different conditions.
- L24: `return null;` - Returns data/UI to the caller, ending the current function path.
- L25: `}` - Contributes to the local implementation details in this scope.
- L27: `const user = await db.query.users.findFirst({ where: eq(users.email, email) });` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L28: `if (!user?.passwordHash) {` - Branches control flow so different code paths run under different conditions.
- L29: `return null;` - Returns data/UI to the caller, ending the current function path.
- L30: `}` - Contributes to the local implementation details in this scope.
- L32: `const matches = await verifyPassword(password, user.passwordHash);` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L33: `if (!matches) {` - Branches control flow so different code paths run under different conditions.
- L34: `return null;` - Returns data/UI to the caller, ending the current function path.
- L35: `}` - Contributes to the local implementation details in this scope.
- L37: `return {` - Returns data/UI to the caller, ending the current function path.
- L38: `id: user.id,` - Contributes to the local implementation details in this scope.
- L39: `email: user.email,` - Contributes to the local implementation details in this scope.
- L40: `name: user.name,` - Contributes to the local implementation details in this scope.
- L41: `image: user.avatarUrl,` - Contributes to the local implementation details in this scope.
- L42: `};` - Contributes to the local implementation details in this scope.
- L43: `},` - Contributes to the local implementation details in this scope.
- L44: `}),` - Contributes to the local implementation details in this scope.
- L45: `];` - Contributes to the local implementation details in this scope.
- L47: `if (githubClientId && githubClientSecret) {` - Branches control flow so different code paths run under different conditions.
- L48: `providers.push(` - Contributes to the local implementation details in this scope.
- L49: `GitHub({` - Contributes to the local implementation details in this scope.
- L50: `clientId: githubClientId,` - Contributes to the local implementation details in this scope.
- L51: `clientSecret: githubClientSecret,` - Contributes to the local implementation details in this scope.
- L52: `}),` - Contributes to the local implementation details in this scope.
- L53: `);` - Contributes to the local implementation details in this scope.
- L54: `}` - Contributes to the local implementation details in this scope.
- L56: `export const authConfig: NextAuthConfig = {` - Declares a constant used to hold configuration, state, or helper logic in this scope.
- L57: `session: { strategy: "jwt" },` - Contributes to the local implementation details in this scope.
- L58: `providers,` - Contributes to the local implementation details in this scope.
- L59: `pages: {` - Contributes to the local implementation details in this scope.
- L60: `signIn: "/login",` - Contributes to the local implementation details in this scope.
- L61: `},` - Contributes to the local implementation details in this scope.
- L62: `callbacks: {` - Contributes to the local implementation details in this scope.
- L63: `async jwt({ token, user }) {` - Contributes to the local implementation details in this scope.
- L64: `if (user?.id) {` - Branches control flow so different code paths run under different conditions.
- L65: `token.sub = user.id;` - Contributes to the local implementation details in this scope.
- L66: `}` - Contributes to the local implementation details in this scope.
- L67: `return token;` - Returns data/UI to the caller, ending the current function path.
- L68: `},` - Contributes to the local implementation details in this scope.
- L69: `async session({ session, token }) {` - Contributes to the local implementation details in this scope.
- L70: `if (session.user && token.sub) {` - Branches control flow so different code paths run under different conditions.
- L71: `session.user.id = token.sub;` - Contributes to the local implementation details in this scope.
- L72: `}` - Contributes to the local implementation details in this scope.
- L73: `return session;` - Returns data/UI to the caller, ending the current function path.
- L74: `},` - Contributes to the local implementation details in this scope.
- L75: `},` - Contributes to the local implementation details in this scope.
- L76: `};` - Contributes to the local implementation details in this scope.
- L78: `export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);` - Declares a constant used to hold configuration, state, or helper logic in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
- L9: Module/function-scoped constant provides stable reference.
- L10: Module/function-scoped constant provides stable reference.
- L12: Module/function-scoped constant provides stable reference.
- L20: Module/function-scoped constant provides stable reference.
- L21: Module/function-scoped constant provides stable reference.
- L27: Module/function-scoped constant provides stable reference.
- L32: Module/function-scoped constant provides stable reference.

### Control flow
- L23: Conditional branch chooses behavior based on runtime input.
- L28: Conditional branch chooses behavior based on runtime input.
- L33: Conditional branch chooses behavior based on runtime input.
- L47: Conditional branch chooses behavior based on runtime input.
- L64: Conditional branch chooses behavior based on runtime input.
- L70: Conditional branch chooses behavior based on runtime input.

### Side effects
- L27: Database IO side effect.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- database modeling with ORM
- authentication and session callbacks
- TypeScript type contracts
- async/await control flow

## Common mistakes
- Changing this file without updating dependent modules.
- Ignoring edge-case error paths.
- Skipping tests/docs for behavior changes.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- database modeling with ORM: search for "Drizzle ORM schema and relations"
- authentication and session callbacks: search for "NextAuth credentials provider callbacks"
- TypeScript type contracts: search for "TypeScript interfaces vs types"
- async/await control flow: search for "JavaScript async await error handling"
