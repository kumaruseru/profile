from django.contrib import admin
from .models import WorkExperience, Education, Skill, SkillCategory

@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company_name', 'start_date', 'is_current')
    list_filter = ('is_current',)
    search_fields = ('company_name', 'role')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('school_name', 'degree', 'start_date', 'end_date')

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 3

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    inlines = [SkillInline]
    list_display = ('name', 'order')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'is_featured')
    list_filter = ('category', 'is_featured')
    search_fields = ('name',)