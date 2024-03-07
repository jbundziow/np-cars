const {DataTypes} = require('sequelize');



import { Op } from "sequelize";
import sequelize from "../database/database";
const PlaceModel = sequelize.define('Place', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      projectCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      placeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'closed', 'banned'),
        allowNull: false
      },

})


// const syncModel = async () => {
//   await PlaceModel.sync({ force: true });
// }
// syncModel();



class Place {
    constructor(
        private id: number | null,
        private projectCode: string,
        private placeName: string,
        private projectName: string,
        private status: 'active' | 'closed' | 'banned',
        ) {}

    async addOnePlace() {
        await PlaceModel.create({
          id: this.id,
          projectCode: this.projectCode,
          placeName: this.placeName,
          projectName: this.projectName,
          status: this.status
        })
    }

    async updateOnePlace() {
      await PlaceModel.update({
        // id: this.id,
        projectCode: this.projectCode,
        placeName: this.placeName,
        projectName: this.projectName,
        status: this.status
      },
      {where: {id: this.id}})
  }


    static async fetchOne(id: number, showBanned: boolean) {
      if(showBanned) {
        return await PlaceModel.findOne({ where: { id: id } })
      }
      else {
          return await PlaceModel.findOne({where: { id: id, status: { [Op.ne]: 'banned' }}})
      }
    }




    static async fetchAllPlacesWithFilters (filters:any, pageSize: number, pageNumber: number, sortFromOldest: boolean) {
      const whereClause: any = {};


      //strings (case-insensitive search)
      if(filters.projectCode) {
        whereClause.projectCode = { [Op.and]: [
          sequelize.where(sequelize.fn('LOWER', sequelize.col('projectCode')), 'LIKE', `%${filters.projectCode.toLowerCase()}%`)
        ] };
      }

      if(filters.placeName) {
        whereClause.placeName = { [Op.and]: [
          sequelize.where(sequelize.fn('LOWER', sequelize.col('placeName')), 'LIKE', `%${filters.placeName.toLowerCase()}%`)
        ] };
      }

      if(filters.projectName) {
        whereClause.projectName = { [Op.and]: [
          sequelize.where(sequelize.fn('LOWER', sequelize.col('projectName')), 'LIKE', `%${filters.projectName.toLowerCase()}%`)
        ] };
      }

      //status
      if(filters.status) {
        whereClause.status = filters.status;
      }



      const totalCount = await PlaceModel.count({
          where: whereClause,
      });


      const totalPages = Math.ceil(totalCount / pageSize);


      const offset = (pageNumber - 1) * pageSize;


      let sortDirection: 'ASC' | 'DESC' = 'DESC';
      if(sortFromOldest === true) {sortDirection = 'ASC'}

      const records = await PlaceModel.findAll({
          where: whereClause,
          limit: pageSize,
          offset: offset,
          order: [['createdAt', sortDirection]] //sort from the newest
      });



      return {
          records,
          pagination: {
            totalCount: totalCount,
            totalPages: totalPages,
            currentPage: pageNumber,
            hasPreviousPage: pageNumber > 1,
            hasNextPage: pageNumber < totalPages
          }
      };
  }







  static async deletePlace(id: number) {
    const place = await Place.fetchOne(id, true);

    if (place) {
      return await place.destroy();
    }
    else {
      throw new Error('Place not found');
    }
}





    
}



export default Place;
