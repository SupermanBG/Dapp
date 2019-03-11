import React from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from '../routes';
export default()=>{
  return (
    <Menu style={{marginTop:'8px'}}>
    <Menu.Item>
    <Link route='/'>
    <a>
    首页
    </a>
    </Link>
    </Menu.Item>
      <Menu.Menu position = 'right'>
      <Menu.Item>
      <Link route='campaigns/new'>
      <a>
      众筹
      </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
      <Link route='campaigns/new'>
      <a>
      +
      </a>
        </Link>
      </Menu.Item>
        </Menu.Menu>
    </Menu>
  );
}
