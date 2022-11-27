export interface ValidationError {
    errors:  Array<{
        value: string;
        msg: string;
        param: string;
        location: string;
    }>
}
