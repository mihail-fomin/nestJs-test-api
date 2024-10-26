import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { ArticlesService } from './articles.service';
  import { CreateArticleDto } from './dto/create-article.dto';
  import { UpdateArticleDto } from './dto/update-article.dto';
  import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
  import { ArticleEntity } from './entities/article.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @Controller('articles')
  @ApiTags('articles')
  export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ type: ArticleEntity })
    async create(@Body() createArticleDto: CreateArticleDto) {
      return new ArticleEntity(
        await this.articlesService.create(createArticleDto),
      );
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: ArticleEntity, isArray: true })
    async findAll() {
      const articles = await this.articlesService.findAll();
      return articles.map((article) => new ArticleEntity(article));
    }

    @Get('latest')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: ArticleEntity, isArray: true })
    async findFiveLatest() {
      const articles = await this.articlesService.findFiveLatest();
      return articles.map((article) => new ArticleEntity(article));
    }
  
    @Get('drafts')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: ArticleEntity, isArray: true })
    async findDrafts() {
      const drafts = await this.articlesService.findDrafts();
      return drafts.map((draft) => new ArticleEntity(draft));
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: ArticleEntity })
    async findOne(@Param('id') id: string) {
      return new ArticleEntity(await this.articlesService.findOne(id));
    }
  
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ type: ArticleEntity })
    async update(
      @Param('id') id: string,
      @Body() updateArticleDto: UpdateArticleDto,
    ) {
      return new ArticleEntity(
        await this.articlesService.update(id, updateArticleDto),
      );
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: ArticleEntity })
    async remove(@Param('id') id: string) {
      return new ArticleEntity(await this.articlesService.remove(id));
    }
  }
