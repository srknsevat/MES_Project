import { ComponentType, ReactElement } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormField = {
  name: string;
  label: string;
  component: ComponentType<any>;
  validation?: yup.AnySchema;
  props?: Record<string, any>;
};

type FormBuilderProps<T extends FieldValues> = {
  schema: FormField[];
  onSubmit: SubmitHandler<T>;
  defaultValues?: Partial<T>;
  formProps?: Record<string, any>;
};

export const FormBuilder = <T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  formProps
}: FormBuilderProps<T>): ReactElement => {
  const validationSchema = schema.reduce((acc, field) => {
    if (field.validation) {
      return { ...acc, [field.name]: field.validation };
    }
    return acc;
  }, {});

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<T>({
    resolver: yupResolver(yup.object().shape(validationSchema)),
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...formProps}>
      {schema.map(({ name, label, component: Component, props }) => (
        <div key={name} style={{ marginBottom: '1rem' }}>
          <label htmlFor={name}>{label}</label>
          <Component
            name={name}
            control={control}
            {...props}
            error={!!errors[name]}
            helperText={errors[name]?.message}
          />
        </div>
      ))}
    </form>
  );
};