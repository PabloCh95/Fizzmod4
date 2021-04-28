export function emailValidation({email})
{
    // eslint-disable-next-line no-unused-vars
    const emailValid= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailValid.test(value);   
}