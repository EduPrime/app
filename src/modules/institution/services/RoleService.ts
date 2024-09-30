import BaseService from "@/services/BaseService";

const table = 'role'
type RoleTable = typeof table
class RoleService extends BaseService<RoleTable> {
  constructor() {
    super(table);
  }  
  async getRoles() {
    const { data, error } = await this.client
      .from(this.table)
      .select(`*`)
    if (error) {
      throw error
    }
    return data
  }
}

export default RoleService;
