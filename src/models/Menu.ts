import MenuSchema from '../schemas/Menu'
import { VerifyAcesss } from '../service/HeimdalApi'

class Menu {
  public async build(menu_params) {

    if(menu_params.ancestors) {
      let menu;
      menu = await MenuSchema.findById(menu_params.ancestors[0])
      let submenu = new MenuSchema(menu_params)
      this.addSubmenu(submenu, menu, 1, menu_params.ancestors)

      if (menu) {
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

public async checkAccess(menus, access) {
    let menusWithoutAccess = []

    for (let index = 0; index < menus.length; index++) {
      let menu = menus[index]
      let resource = menu.resource
      const result = await VerifyAcesss(access.data.token, '604cce0268a4a21f483919c3', resource, 'READ')
      if (!result.data.access) {
        menusWithoutAccess.push(index)
      }
      else {
        if(menu.submenus.length > 0) {
          menu.submenus = await this.checkAccess(menu.submenus, access)
        }
      }
    }

    menusWithoutAccess.forEach((i) => menus.splice(i, 1))

    return menus
  }

  private addSubmenu(submenu, menu, i, ids) {
    let m = menu.submenus.find(submenu => String(submenu._id) === ids[i])
    if (i < ids.length) {
      i += 1
      this.addSubmenu(submenu, m, i, ids)
    }
    else {
      menu.submenus.push(submenu)
    }
  }
}

export default new Menu
