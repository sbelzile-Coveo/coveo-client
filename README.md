# Coveo Cloud JS Client

Javascript client for the Coveo Cloud platform.

## Usage

### Constructor

```typescript
var client = new Coveo.Client({
    organizationId: "qadynamics",
    token: "[some API key]"
});
```

### Sources

```typescript
client.Sources.get()
    .then(sources => sources.map(source => console.log(source.name)));
```

### Source

#### Get
```typescript
client.Source.get("id");
```

#### Delete
```typescript
client.Source.delete("id");
```

#### Create
```typescript
client.Source.delete("id", {});
```

#### Rebuild
```typescript
client.Source.rebuild("id");
```

## Build
npm run build
