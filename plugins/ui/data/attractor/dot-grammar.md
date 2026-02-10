# DOT Grammar for Strike Workflows

## Supported Subset

Strike accepts a strict subset of the Graphviz DOT language for pipeline definitions.

## BNF Grammar

```
Graph           ::= 'digraph' Identifier '{' Statement* '}'

Statement       ::= GraphAttrStmt
                   | NodeDefaults
                   | EdgeDefaults
                   | SubgraphStmt
                   | NodeStmt
                   | EdgeStmt
                   | GraphAttrDecl

GraphAttrStmt   ::= 'graph' AttrBlock ';'?
NodeDefaults    ::= 'node' AttrBlock ';'?
EdgeDefaults    ::= 'edge' AttrBlock ';'?
GraphAttrDecl   ::= Identifier '=' Value ';'?

SubgraphStmt    ::= 'subgraph' Identifier? '{' Statement* '}'

NodeStmt        ::= Identifier AttrBlock? ';'?
EdgeStmt        ::= Identifier ( '->' Identifier )+ AttrBlock? ';'?

AttrBlock       ::= '[' Attr ( ',' Attr )* ']'
Attr            ::= Key '=' Value

Key             ::= Identifier | QualifiedId
QualifiedId     ::= Identifier ( '.' Identifier )+

Value           ::= String | Integer | Float | Boolean | Duration
Identifier      ::= [A-Za-z_][A-Za-z0-9_]*
String          ::= '"' ( '\"' | '\n' | '\t' | '\\' | [^"\\] )* '"'
Integer         ::= '-'? [0-9]+
Float           ::= '-'? [0-9]* '.' [0-9]+
Boolean         ::= 'true' | 'false'
Duration        ::= Integer ( 'ms' | 's' | 'm' | 'h' | 'd' )
```

## Key Constraints

- **One digraph per file** - Multiple graphs, undirected graphs rejected
- **Bare identifiers for node IDs** - Human-readable names in `label` attribute
- **Commas required between attributes** - Inside attribute blocks
- **Directed edges only** - `->` is the only edge operator
- **Comments supported** - Both `// line` and `/* block */`

## Value Types

| Type     | Syntax                          | Examples                             |
|----------|---------------------------------|--------------------------------------|
| String   | Double-quoted with escapes      | `"Hello world"`, `"line1\nline2"`     |
| Integer  | Optional sign, digits           | `42`, `-1`, `0`                      |
| Float    | Decimal number                  | `0.5`, `-3.14`                       |
| Boolean  | Literal keywords                | `true`, `false`                      |
| Duration | Integer + unit suffix           | `900s`, `15m`, `2h`, `250ms`, `1d`   |

## Graph-Level Attributes

| Key                    | Type     | Default   | Description |
|------------------------|----------|-----------|-------------|
| `goal`                 | String   | `""`      | Pipeline goal |
| `label`                | String   | `""`      | Display name |
| `model_stylesheet`    | String   | `""`      | CSS-like LLM config |
| `default_max_retry`    | Integer  | `50`      | Global retry ceiling |
| `retry_target`         | String   | `""`      | Jump target on failure |
| `fallback_retry_target`| String   | `""`      | Secondary jump target |
| `default_fidelity`     | String   | `""`      | Default context fidelity |

## Node Attributes

| Key                | Type     | Default         | Description |
|--------------------|----------|-----------------|-------------|
| `label`            | String   | node ID         | Display name |
| `shape`            | String   | `"box"`         | Graphviz shape |
| `type`             | String   | `""`            | Handler type override |
| `prompt`           | String   | `""`            | LLM prompt |
| `max_retries`      | Integer  | `0`             | Additional retry attempts |
| `goal_gate`        | Boolean  | `false`         | Must succeed before exit |
| `retry_target`     | String   | `""`            | Jump target on failure |
| `fidelity`         | String   | inherited       | Context fidelity mode |
| `timeout`          | Duration | unset           | Max execution time |
| `llm_model`        | String   | inherited       | LLM model identifier |
| `class`            | String   | `""`            | CSS class names |

## Edge Attributes

| Key          | Type     | Default | Description |
|--------------|----------|---------|-------------|
| `label`      | String   | `""`    | Display caption |
| `condition`  | String   | `""`    | Boolean guard expression |
| `weight`     | Integer  | `0`     | Routing priority |
| `fidelity`   | String   | unset   | Fidelity override |
| `loop_restart`| Boolean  | `false` | Restart pipeline |

## Shape-to-Handler Mapping

| Shape           | Handler Type    | Description |
|-----------------|-----------------|-------------|
| `Mdiamond`      | `start`         | Pipeline entry |
| `Msquare`       | `exit`          | Pipeline exit |
| `box`           | `codergen`      | LLM task |
| `hexagon`       | `wait.human`    | Human gate |
| `diamond`       | `conditional`   | Routing point |
| `component`     | `parallel`      | Parallel fan-out |
| `tripleoctagon` | `parallel.fan_in` | Parallel fan-in |
| `parallelogram` | `tool`          | External tool |

## Minimal Example

```
digraph Simple {
    graph [goal="Generate unique UI"]

    start [shape=Mdiamond, label="Start"]
    analyze [shape=box, label="Analyze", prompt="Analyze the prompt"]
    build [shape=box, label="Build", prompt="Build the UI"]
    exit [shape=Msquare, label="Exit"]

    start -> analyze -> build -> exit
}
```
