### ROLES

O sistema de roles do supabase é diretamente ligada as roles do postgres.

Para podermos fazer um controle do que cada usuário pode ter acesso precisamos habilitar RLS (Row-Level Security).

```
ALTER TABLE school ENABLE ROW LEVEL SECURITY;
```

A partir disso nos podemos criar logica nas policies para permitir se um usuário pode ou não acessar aquele registro

```
CREATE POLICY "Editor or Admin can view documents" ON discipline
    FOR SELECT
    USING (
      auth.role() = 'adm' OR -- Permitir se o usuário é administrador
      (auth.role() = 'teacher' AND auth.uid() = teacher_id) -- Permitir se o usuário é professor e o teacher_id corresponde ao user_id do usuario autenticado.
    );
```
