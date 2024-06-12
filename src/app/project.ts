import { Filehandle } from "./filehandle";
import { ProjectImage } from "./project-image";
import { Projectdetails } from "./projectdetails";

export interface Project {
    id?: number;
    title: string;
    description: string;
    projectImage?: ProjectImage[];
    projectDetails: Projectdetails;
}
