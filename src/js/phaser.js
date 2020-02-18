import 'phaser/src/polyfills';

import Animations from 'phaser/src/animations';
import Cache from 'phaser/src/cache';
// import Class from 'phaser/src/utils/Class';
import Constants from 'phaser/src/const';
import Core from 'phaser/src/core';

// Cameras
import Scene2D from 'phaser/src/cameras/2d';

import Data from 'phaser/src/data';

// Display
import Masks from 'phaser/src/display/mask';

import Events from 'phaser/src/events';
import Game from 'phaser/src/core/Game';

import DisplayList from 'phaser/src/gameobjects/DisplayList';
import UpdateList from 'phaser/src/gameobjects/UpdateList';

import GameObject from 'phaser/src/gameobjects/GameObject';
import GameObjectCreator from 'phaser/src/gameobjects/GameObjectCreator';
import GameObjectFactory from 'phaser/src/gameobjects/GameObjectFactory';
import BuildGameObject from 'phaser/src/gameobjects/BuildGameObject';
import BuildGameObjectAnimation from 'phaser/src/gameobjects/BuildGameObjectAnimation';

import Components from 'phaser/src/gameobjects/components';

import Graphics from 'phaser/src/gameobjects/graphics/Graphics';
import GraphicsCreator from 'phaser/src/gameobjects/graphics/GraphicsCreator';
import GraphicsFactory from 'phaser/src/gameobjects/graphics/GraphicsFactory';

import Image from 'phaser/src/gameobjects/image/Image';
import ImageCreator from 'phaser/src/gameobjects/image/ImageCreator';
import ImageFactory from 'phaser/src/gameobjects/image/ImageFactory';

import Sprite from 'phaser/src/gameobjects/sprite/Sprite';
import SpriteCreator from 'phaser/src/gameobjects/sprite/SpriteCreator';
import SpriteFactory from 'phaser/src/gameobjects/sprite/SpriteFactory';

import Text from 'phaser/src/gameobjects/text/static/Text';
import TextCreator from 'phaser/src/gameobjects/text/static/TextCreator';
import TextFactory from 'phaser/src/gameobjects/text/static/TextFactory';

import Input from 'phaser/src/input';

// Math
import Between from 'phaser/src/math/Between';
import Vector2 from 'phaser/src/math/Vector2';

// Loader.FileTypes
import AnimationJSONFile from 'phaser/src/loader/filetypes/AnimationJSONFile';
import AtlasJSONFile from 'phaser/src/loader/filetypes/AtlasJSONFile';
import AudioFile from 'phaser/src/loader/filetypes/AudioFile';
import ImageFile from 'phaser/src/loader/filetypes/ImageFile';
import JSONFile from 'phaser/src/loader/filetypes/JSONFile';
import SpriteSheetFile from 'phaser/src/loader/filetypes/SpriteSheetFile';
import TextFile from 'phaser/src/loader/filetypes/TextFile';
// Loader
import File from 'phaser/src/loader/File';
import FileTypesManager from 'phaser/src/loader/FileTypesManager';
import GetURL from 'phaser/src/loader/GetURL';

import Renderer from 'phaser/src/renderer';
import Scale from 'phaser/src/scale';
import Scene from 'phaser/src/scene/Scene';
import Scenes from 'phaser/src/scene';
import Sound from 'phaser/src/sound';
import Textures from 'phaser/src/textures';
import Time from 'phaser/src/time';
import Tweens from 'phaser/src/tweens';

const Phaser = {
  Animations,
  Cache,
  Cameras: { Scene2D: Scene2D },
  Constants,
  // Class,
  Core,
  Data,
  Display: { Masks },
  Events,
  Game,
  GameObjects: {
    DisplayList,
    UpdateList,
    GameObject,
    BuildGameObject,
    BuildGameObjectAnimation,
    Components,
    Graphics,
    Image,
    Sprite,
    Text,
    Creators: {
      GameObject: GameObjectCreator,
      Graphics: GraphicsCreator,
      Image: ImageCreator,
      Sprite: SpriteCreator,
      Text: TextCreator,
    },
    Factories: {
      GameObject: GameObjectFactory,
      Graphics: GraphicsFactory,
      Image: ImageFactory,
      Sprite: SpriteFactory,
      Text: TextFactory,
    },
  },
  Input,
  Loader: {
    FileTypes: {
      AnimationJSONFile,
      AtlasJSONFile,
      AudioFile,
      ImageFile,
      JSONFile,
      SpriteSheetFile,
      TextFile,
    },
    File,
    FileTypesManager,
    GetURL,
    // LoaderPlugin: require('./loader/LoaderPlugin'),
  },
  Math: {
    Between,
    Vector2,
  },
  // Plugins: require('./plugins'),
  Renderer,
  Scale,
  Scene,
  Scenes,
  Sound,
  // Structs: require('./structs')
  Textures,
  Time,
  Tweens,
};

export default Phaser;

/*
 * "Documentation is like pizza: when it is good, it is very, very good;
 * and when it is bad, it is better than nothing."
 *  -- Dick Brandon
 */
