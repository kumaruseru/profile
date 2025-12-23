from django.db import models

class WorkExperience(models.Model):
    """
    Dữ liệu cho phần Kinh nghiệm làm việc
    """
    company_name = models.CharField("Tên công ty", max_length=255)
    role = models.CharField("Vị trí / Chức danh", max_length=255)
    
    # Thời gian
    start_date = models.DateField("Ngày bắt đầu")
    end_date = models.DateField("Ngày kết thúc", null=True, blank=True, help_text="Để trống nếu hiện tại đang làm")
    is_current = models.BooleanField("Đang làm việc tại đây", default=False)
    
    # Nội dung chi tiết
    description = models.TextField("Mô tả công việc", help_text="Hỗ trợ Markdown hoặc gạch đầu dòng")
    technologies_used = models.CharField("Công nghệ sử dụng", max_length=500, blank=True, help_text="Vd: Python, Django, React (ngăn cách bằng dấu phẩy)")
    
    logo = models.ImageField("Logo công ty", upload_to="resume/companies/", blank=True, null=True)
    order = models.PositiveIntegerField("Thứ tự hiển thị", default=0)

    class Meta:
        ordering = ['-is_current', '-start_date'] # Việc đang làm lên đầu, sau đó đến việc mới nhất
        verbose_name = "Kinh nghiệm làm việc"
        verbose_name_plural = "Kinh nghiệm làm việc"

    def __str__(self):
        return f"{self.company_name} - {self.role}"


class Education(models.Model):
    """
    Dữ liệu cho EducationCard
    """
    school_name = models.CharField("Trường học", max_length=255)
    degree = models.CharField("Bằng cấp", max_length=255, help_text="Vd: Bachelor of Science in Computer Science")
    field_of_study = models.CharField("Chuyên ngành", max_length=255, blank=True)
    
    start_date = models.DateField("Ngày bắt đầu")
    end_date = models.DateField("Ngày kết thúc (dự kiến)", null=True, blank=True)
    
    grade = models.CharField("Điểm số / Xếp loại", max_length=100, blank=True)
    description = models.TextField("Mô tả thêm", blank=True, help_text="Thành tích, hoạt động ngoại khóa...")
    
    logo = models.ImageField("Logo trường", upload_to="resume/schools/", blank=True, null=True)

    class Meta:
        ordering = ['-start_date']
        verbose_name = "Học vấn"
        verbose_name_plural = "Học vấn"

    def __str__(self):
        return self.school_name


class SkillCategory(models.Model):
    """
    Phân loại Skill (Backend, Frontend, DevOps, Tools...)
    """
    name = models.CharField("Tên nhóm", max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Nhóm kỹ năng"
        verbose_name_plural = "Nhóm kỹ năng"

    def __str__(self):
        return self.name


class Skill(models.Model):
    """
    Dữ liệu cho TechStack Component
    """
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name="skills")
    name = models.CharField("Tên kỹ năng", max_length=100, help_text="Vd: Python, Rust, Docker")
    icon = models.ImageField("Icon/Logo", upload_to="resume/skills/", blank=True, null=True)
    proficiency = models.PositiveIntegerField("Độ thành thạo (%)", default=0, help_text="Từ 0 đến 100")
    is_featured = models.BooleanField("Nổi bật", default=False, help_text="Hiển thị ở trang chủ hoặc phần tóm tắt")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['category__order', 'order']
        verbose_name = "Kỹ năng (Skill)"
        verbose_name_plural = "Kỹ năng (Skill)"

    def __str__(self):
        return self.name