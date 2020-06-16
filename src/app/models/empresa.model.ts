export class Empresa {
    constructor(
        public nombre: string,
        public direccion: string,
        public cuit: string,
        public codigoempresa?: string,
        public img?: string,
        public id?: number
    ) {}
}
