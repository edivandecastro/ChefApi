import MenuSchema from '../schemas/Menu'

class Menu {
  public async build(menu_params) {
    if(menu_params.parent_id) {
      let menu = await MenuSchema.findById(menu_params.parent_id)

      if (menu) {
        let submenu = new MenuSchema(menu_params);
        menu.submenus.push(submenu);
        return menu;
      }
      else {
        throw new Error('Não foi possível adicionar o submenu pois o menu superior não foi localizado');
      }
    }
    else {
      return new MenuSchema(menu_params);
    }
  }
}

export default new Menu
