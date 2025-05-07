'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-separator';
import { Filter, Loader2, X } from 'lucide-react';
import { MySelect } from './my-select';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { ShowJson } from './show-json';
import { Button } from './ui/button';

// Componente principal
export function FilterBaseNew({ additionalFieldsSchema }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isPendingFilterTransition, startTransition] = useTransition();

  const combinedSchema = z
    .object({
      filterFilter: z.string().default('').describe('Filtrar...'),
    })
    .merge(additionalFieldsSchema || z.object({}));

  const form = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues: combinedSchema.parse(
      Object.keys(combinedSchema.shape).reduce((acc, key) => {
        acc[key] = searchParams.get(key) ?? undefined;
        return acc;
      }, {}),
    ),
  });

  const { handleSubmit, reset, watch } = form;

  const onSubmit = data => {
    const params = new URLSearchParams();

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        // Condição mais robusta
        params.set(key, data[key]);
      }
    }

    params.set('pageIndex', '0');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleResetFilters = () => {
    reset();
    const params = new URLSearchParams();
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasFilters = Object.keys(watch()).some(key => watch(key) !== '');

  const renderField = (fieldName: string, fieldSchema: z.ZodTypeAny) => {
    const description = fieldSchema?._def?.description; // eslint-disable-line no-underscore-dangle
    const values = fieldSchema?._def?.innerType._def.values; // eslint-disable-line no-underscore-dangle
    const typeName = fieldSchema?._def?.innerType._def.typeName; // eslint-disable-line no-underscore-dangle

    switch (typeName) {
      case 'ZodString':
        return (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName as never}
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Nome</FormLabel> */}
                <FormControl>
                  <Input placeholder={description} {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case 'ZodEnum': // Lida com enums (select)
        return (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName as never}
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>{description}</FormLabel> */}
                <FormControl>
                  <MySelect
                    {...field}
                    options={values.map(label => ({
                      value: label,
                      label,
                    }))}
                    menuPosition="absolute"
                    value={field.value}
                    placeholder={description}
                    className="w-48"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        // return null;
        return (
          <div className="flex">
            <ShowJson data={{ fieldSchema, fieldName, description, values, typeName }} />
          </div>
        );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
        {Object.keys(combinedSchema.shape).map(fieldName =>
          renderField(fieldName, combinedSchema.shape[fieldName]),
        )}

        <Separator orientation="vertical" className="hidden h-6 md:block" />

        <div className="flex gap-2">
          <Button type="submit" variant="secondary" disabled={!hasFilters}>
            {isPendingFilterTransition ? (
              <Loader2 className="mr-2 size-3 animate-spin" />
            ) : (
              <Filter className="size-3 md:mr-2" />
            )}
            <span className="hidden md:block">Filter</span>
          </Button>

          <Button
            onClick={handleResetFilters}
            disabled={!hasFilters}
            type="button"
            variant="outline"
          >
            <X className="size-3 md:mr-2" />
            <span className="hidden md:block">Reset</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

// // Exemplo de uso:
// const myAdditionalFieldsSchema = {
//   category: z.string().optional().describe('Categoria'),
//   priceRange: z.string().optional().describe('Faixa de Preço'),
//   customField: z.custom().describe('Campo Customizado'), // Schema para inputs customizados
//   productType: z.enum(['novo', 'usado']).describe('Tipo de Produto'),
//   available: z.boolean().describe('Disponível'),
//   quantity: z.number().int().positive().describe('Quantidade'),
// };

// <FilterBase additionalFieldsSchema={myAdditionalFieldsSchema} />;
