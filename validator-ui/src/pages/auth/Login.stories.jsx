import { Template } from './Login';
import { EmailConfirmation } from './EmailConfirmation';

export default {
    title: 'Pages/Login',
    component: Template,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        onSubmit: (e) => {
            e.preventDefault();
            console.log(e);
        },
        register: () => {},
        errors: {},
        isLoading: false,
    },
};

export const Default = (args) => <Template {...args} />;

export const onLoading = (args) => <Template {...args} />;
onLoading.args = {
    isLoading: true,
};

export const onError = (args) => <Template {...args} />;
onError.args = {
    errors: {
        email: {
            message: 'Adresa de email invalidă',
        },
    },
};

export const onSuccessfulSubmit = (args) => <EmailConfirmation />;
onSuccessfulSubmit.parameters = {
    layout: 'fullscreen',
};
