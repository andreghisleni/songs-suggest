'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/data-table';
import { useGetAllResponsiblesQuery } from '@/generated/graphql';
import { Responsible } from '@/app/app/[slug]/group/responsibles/columns';
import { ResponsibleFormDialog } from '@/app/app/[slug]/group/responsibles/responsible-form-dialog';
import { columns } from './columns';

// import { Container } from './styles';

export const ResponsibleInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  responsible,
  control,
  name,
}: {
  name: TName;
  control: Control<TFieldValues, TName>;
  responsible?: Responsible;
}) => {
  const [filter, setFilter] = useState(responsible?.name);
  const [isOpen, setIsOpen] = useState(false);

  const { data: responsibles } = useGetAllResponsiblesQuery({
    variables: {
      filter: {
        filter: filter || '',
        limit: 100,
        page: 0,
      },
    },
  });

  const getName = (p?: Responsible) => {
    return `${p?.name}`;
  };

  useEffect(() => {
    setFilter(responsible?.name);
  }, [responsible]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Responsável</FormLabel>
          <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
              <FormControl>
                <div>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full md:min-w-96',
                      'pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                    // disabled={field.disabled}
                  >
                    {field.value ? (
                      <span>
                        {getName(responsibles?.responsibles.find(p => p.id === field.value))}
                      </span>
                    ) : (
                      <span>Selecione um responsável</span>
                    )}
                  </Button>
                </div>
              </FormControl>
            </DialogTrigger>
            <DialogContent className="w-auto max-w-6xl p-14">
              <DataTable
                columns={columns({
                  onSelect: p => {
                    field.onChange(p.id);

                    setIsOpen(false);
                  },
                })}
                data={responsibles?.responsibles || []}
                filterComponent={
                  <Input
                    placeholder="Filtrar por nome"
                    onChange={v => setFilter(v.currentTarget.value)}
                    className="max-w-xs"
                  />
                }
                ifJustFilterComponent
                addComponent={
                  <ResponsibleFormDialog
                    refetch={d => {
                      setFilter(d.name);
                    }}
                  />
                }
              />
            </DialogContent>
          </Dialog>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
