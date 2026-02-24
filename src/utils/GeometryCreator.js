// src/utils/GeometryCreator.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { RoundedRectangle } from './RoundedRecCreator';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const whitePotato = '/assets/models/WhitePotato.glb';
const whitePotatoGerminated = '/assets/models/WhitePotatoGerminated.glb';

const RADIUS = 10;

export const createRoundedRectangle = () => {
    const loader = new TextureLoader();
    THREE.ColorManagement.enabled = true;  // 使用 color management

    const images = [
        { path: '/assets/pics/others.jpg', route: '/works/others' },
        { path: '/assets/pics/architecture.jpg', route: '/works/architecture' },
        { path: '/assets/pics/craft.jpg', route: '/works/craft' },
        { path: '/assets/pics/gamedev.jpg', route: '/works/gamedev' },
        { path: '/assets/pics/photo.jpg', route: '/works/photo' },
        { path: '/assets/pics/tool.jpg', route: '/works/tool' },
    ];

    const objects = images.map(img => {
        const texture = loader.load(img.path);
        texture.colorSpace = THREE.SRGBColorSpace;

        return {
            map: texture,
            route: img.route,
            side: THREE.DoubleSide,
        };
    });

    return objects.map((obj) => {
        const geometry = RoundedRectangle(2, 3, 0.2, 10);
        const material = new THREE.MeshBasicMaterial({ map: obj.map, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.route = obj.route;
        mesh.userData.originalY = 2 - (1 / (1 + Math.exp(10 * (0 + 0.8)))) * (1000000);
        mesh.position.y = 2 - (1 / (1 + Math.exp(10 * (0 + 0.8)))) * (1000000);

        return mesh;
    });
};

export const createPotato = (isCenter) => {

    const draco = new DRACOLoader();
    draco.setDecoderPath('/draco/');

    // 设置纹理加载器
    const textureCube = new THREE.CubeTextureLoader()

    const cubeTexture = textureCube.load([
        '/assets/textures/Standard-Cube-Map/px.jpg',
        '/assets/textures/Standard-Cube-Map/nx.jpg',
        '/assets/textures/Standard-Cube-Map/py.jpg',
        '/assets/textures/Standard-Cube-Map/ny.jpg',
        '/assets/textures/Standard-Cube-Map/pz.jpg',
        '/assets/textures/Standard-Cube-Map/nz.jpg'
    ]);

    //1网格土豆
    function generateGridPositions(rows, cols, spacing) {
        const positions = [];
        const startX = -((cols - 1) * spacing) / 2;
        const startZ = -((rows - 1) * spacing) / 2;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = startX + j * spacing;
                const y = 0;
                const z = startZ + i * spacing;
                positions.push(new THREE.Vector3(x, y, z));
            }
        }
        return positions;
    }

    const fixedPotatoPositions = generateGridPositions(5, 5, 20); // 5x5 网格，间距20
    let potatoIndex = 0;

    if (!isCenter) {
        return new Promise((resolve, reject) => {

            const loader = new GLTFLoader();
            loader.setDRACOLoader(draco);
            loader.load(
                whitePotato,
                (glb) => {
                    const model = glb.scene;

                    // 随机旋转
                    model.rotation.x = Math.random() * Math.PI * 2;
                    model.rotation.y = Math.random() * Math.PI * 2;
                    model.rotation.z = Math.random() * Math.PI * 2;

                    // 设置模型大小
                    model.scale.set(30, 30, 30);

                    // const angle = Math.random() * 2 * Math.PI;
                    // const radius = Math.sqrt(Math.random()) * 30; // 使用平方根调整分布
                    // const x = radius * Math.cos(angle);
                    // const y = radius * Math.sin(angle);
                    // const z = (Math.random() * 2 - 1.8) * 20; // 随机生成z轴位置

                    // model.position.set(x, y, z);

                    const pos = fixedPotatoPositions[potatoIndex % fixedPotatoPositions.length];
                    potatoIndex += 1;
                    model.position.copy(pos);

                    // 添加材质
                    // 遍历模型中的所有网格，给每个网格应用材质和纹理
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.material = new THREE.MeshStandardMaterial({
                                envMap: cubeTexture,
                                envMapIntensity: 2,
                                roughness: 0, // 粗糙度
                                metalness: 1, // 金属度
                                color: 0xE0E0E0,
                            });
                        }
                    });

                    resolve(model);
                },
            );
        });
    }
    else {
        return new Promise((resolve, reject) => {

            const loader = new GLTFLoader();

            loader.setDRACOLoader(draco);
            loader.load(
                whitePotatoGerminated,
                (glb) => {
                    const model = glb.scene;

                    // 设置模型大小
                    model.scale.set(50, 50, 50);
                    model.position.set(0, -5, 0);

                    // 添加材质
                    // 遍历模型中的所有网格，给每个网格应用材质和纹理
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.material = new THREE.MeshStandardMaterial({
                                envMap: cubeTexture,
                                envMapIntensity: 2,
                                roughness: 0,
                                metalness: 1,
                                color: 0xE0E0E0,
                            });
                        }
                    });

                    resolve(model);
                },
            );
        });
    }
}

export { RADIUS };
