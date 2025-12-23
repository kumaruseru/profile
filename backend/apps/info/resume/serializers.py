from rest_framework import serializers
from .models import WorkExperience, Education, Skill, SkillCategory

class WorkExperienceSerializer(serializers.ModelSerializer):
    technologies = serializers.SerializerMethodField()

    class Meta:
        model = WorkExperience
        fields = '__all__'

    def get_technologies(self, obj):
        if obj.technologies_used:
            return [t.strip() for t in obj.technologies_used.split(',')]
        return []

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'icon', 'proficiency', 'is_featured']

class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['name', 'skills', 'order']