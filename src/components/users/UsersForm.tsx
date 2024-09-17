import { Form, Formik } from "formik";
import { UserInitialProps } from "../../api/users/UsersDto";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { SelectPickerField } from "../form/SelectPrickerField";
import Button, { BgColors } from "../ui/Button";

interface Props {
  readonly services: any[];
  readonly initialValues: UserInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

export default function UsersForm({ initialValues, setInitialValues, onSubmit, services }: Props) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
      {() => (
        <Form>
          <div className="row p-4">
            <GroupBox title="Foydalanuvchi yaratish">
              <div className="row">
                <div className="col-6">
                  <InputField name="name_of_compony" label="Tashkilot nomi" />
                </div>
                <div className="col-6">
                  <InputField name="email" label="E-pochta" />
                </div>
                <div className="col-6 mt-3">
                  <InputField name="username" label="Username" />
                </div>
                <div className="col-6 mt-3">
                  <InputField name="password" label="Password" />
                </div>
                <div className="col-6 mt-3">
                  <SelectPickerField name="services" label="Servislar" options={services} />
                </div>

                <div className="col-12 d-flex justify-content-end align-items-center mt-3">
                  <Button className="px-3 py-2 text-light" bgColor={BgColors.Green} type="submit">
                    Yuborish
                  </Button>
                </div>
              </div>
            </GroupBox>
          </div>
        </Form>
      )}
    </Formik>
  );
}
