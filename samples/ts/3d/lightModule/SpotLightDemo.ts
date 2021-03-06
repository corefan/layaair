class SpotLightDemo {
    private scene: Laya.Scene;
    private _quaternion: Laya.Quaternion;
    private _position: Laya.Vector3;
    constructor() {
        Laya3D.init(0, 0, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();

        this.scene = new Laya.Scene();
        Laya.stage.addChild(this.scene);

        this._quaternion = new Laya.Quaternion();
        this._position = new Laya.Vector3();

        var camera: Laya.Camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 1000))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 0.7, 1.3));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        camera.addComponent(CameraMoveScript);

        //聚光灯
        var spotLight: Laya.SpotLight = this.scene.addChild(new Laya.SpotLight()) as Laya.SpotLight;
        spotLight.color = new Laya.Vector3(1, 1, 0);
        spotLight.transform.position = new Laya.Vector3(0.0, 1.2, 0.0);
        spotLight.direction = new Laya.Vector3(0.15, -1.0, 0.0);
        spotLight.attenuation = new Laya.Vector3(0.0, 0.0, 0.8);
        spotLight.range = 6.0;
        spotLight.spot = 32;

        var grid: Laya.Sprite3D = this.scene.addChild(Laya.Sprite3D.load("../../res/threeDimen/staticModel/grid/plane.lh")) as Laya.Sprite3D;

        var layaMonkey: Laya.Sprite3D = this.scene.addChild(Laya.Sprite3D.load("../../res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh")) as Laya.Sprite3D;
        layaMonkey.once(Laya.Event.HIERARCHY_LOADED, this, function (): void {
            var aniSprite3d: Laya.Sprite3D = layaMonkey.getChildAt(0) as Laya.Sprite3D;
            var animator: Laya.Animator = aniSprite3d.getComponentByType(Laya.Animator) as Laya.Animator;
            animator.play(null, 1.0, 115, 150);
        });

        Laya.timer.frameLoop(1, this, function (): void {
            Laya.Quaternion.createFromYawPitchRoll(0.025, 0, 0, this._quaternion);
            Laya.Vector3.transformQuat(spotLight.transform.position, this._quaternion, this._position);
            spotLight.transform.position = this._position;
            var _direction: Laya.Vector3 = spotLight.direction;
            Laya.Vector3.transformQuat(_direction, this._quaternion, _direction);
            spotLight.direction = _direction;
        });
    }
}
}
new SpotLightDemo;