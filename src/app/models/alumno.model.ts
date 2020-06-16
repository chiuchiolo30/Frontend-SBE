export class Alumno {
    constructor(
        public nombre?: string,
        public dni?: string,
        public direccion?: string,
        public email?: string,
        public telefono?: string,
        public carrera?: string,
        public libreta?: string,
        public img?: string,
        public id?: string,
        // tslint:disable-next-line:variable-name
        public id_acuerdo?: number
    ) {}
}
