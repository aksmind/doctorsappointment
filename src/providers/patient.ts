export interface Patient{
    name: {
        first: string,
        last?: string
    },
    age?: number,
    dob?: string,
    email: string,
    password: any,
    confirmPassword: any,
    phone: number,
    countryCode: number,
    country: string,
    registrationFor: string,
    symptoms: string,
}

export interface Country {
    name: string,
    dial_code: number,
    code: string,
    flag: string
}

export interface PatientData {
    $key: string,
    first: string,
    last: string,
    date: number,
    email: string,
    password: string,
    confirm: string,
    // code: number,
    phone: number,
    registration: string,
    symptoms: string,
    symptomsArr: any
}