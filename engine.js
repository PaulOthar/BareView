class Point{
    x;
    y;
    z;
    u;
    v;

    transformed_x;
    transformed_y;
    transformed_z;

    constructor(x,y,z,u,v){
        this.x = x;
        this.y = -y;
        this.z = z;
        this.u = u;
        this.v = v;

        this.transformed_x = this.x;
        this.transformed_y = this.y;
        this.transformed_z = this.z;
    }

    transform(cos_xza,sin_xza,cos_yza,sin_yza){
        let A = (cos_xza * this.z) - (sin_xza * this.x);
        this.transformed_x = (sin_xza * this.z) + (cos_xza * this.x);
        this.transformed_y = (cos_yza * this.y) - (sin_yza * A);
        this.transformed_z = (sin_yza * this.y) + (cos_yza * A);
    }
}

class Triangle{
    p1;
    p2;
    p3;

    constructor(p1,p2,p3){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
}

class Mesh{
    points;
    triangles;
    texture;

    constructor(texture){
        this.points = new Array();
        this.triangles = new Array();
        this.texture = texture;
    }

    addPoint(x,y,z,u,v){
        this.points.push(new Point(x,y,z,u,v));
    }

    addTriangle(pi1,pi2,pi3){
        this.triangles = new Triangle(this.points[pi1],this.points[pi2],this.points[pi3]);
    }
}

